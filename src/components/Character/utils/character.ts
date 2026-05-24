import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

/**
 * Creates a baseball cap mesh group to replace the hair.
 * The cap consists of a dome (crown) and a brim (visor).
 */
function createCap(): THREE.Group {
  const capGroup = new THREE.Group();
  capGroup.name = "cap";

  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.7,
    metalness: 0.0,
  });

  // --- Crown (dome) ---
  // SphereGeometry: radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength
  // Upper hemisphere only (thetaStart=0, thetaLength=PI/2)
  const crownGeometry = new THREE.SphereGeometry(
    0.105,  // radius — matches hair bounding box (~0.1)
    32,     // width segments
    16,     // height segments
    0,      // phiStart
    Math.PI * 2, // phiLength (full circle)
    0,      // thetaStart (top)
    Math.PI * 0.55 // thetaLength (slightly past hemisphere for coverage)
  );
  const crown = new THREE.Mesh(crownGeometry, capMaterial);
  crown.scale.set(1.0, 0.75, 1.0); // flatten slightly
  crown.position.set(0, 0.0, 0.0);
  crown.castShadow = true;
  capGroup.add(crown);

  // --- Band (bottom ring of the cap) ---
  const bandGeometry = new THREE.TorusGeometry(0.1, 0.008, 8, 32);
  const bandMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.5,
    metalness: 0.1,
  });
  const band = new THREE.Mesh(bandGeometry, bandMaterial);
  band.position.set(0, -0.01, 0);
  band.rotation.x = Math.PI / 2;
  band.castShadow = true;
  capGroup.add(band);

  // --- Brim (visor) ---
  // Create a curved brim using a partial cylinder
  const brimShape = new THREE.Shape();
  // Semi-circular brim
  brimShape.absarc(0, 0, 0.12, -Math.PI * 0.45, Math.PI * 0.45, false);
  brimShape.absarc(0, 0, 0.06, Math.PI * 0.45, -Math.PI * 0.45, true);

  const brimExtrudeSettings = {
    depth: 0.012,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 2,
  };

  const brimGeometry = new THREE.ExtrudeGeometry(brimShape, brimExtrudeSettings);
  const brim = new THREE.Mesh(brimGeometry, capMaterial);
  brim.rotation.x = Math.PI / 2 + 0.15; // angle slightly downward
  brim.position.set(0, -0.02, 0.08); // in front of face
  brim.castShadow = true;
  capGroup.add(brim);

  // --- Button on top ---
  const buttonGeometry = new THREE.SphereGeometry(0.012, 8, 8);
  const button = new THREE.Mesh(buttonGeometry, capMaterial);
  button.position.set(0, 0.075, 0);
  capGroup.add(button);

  // Position the cap group to match where the hair was
  // Hair was at translation: [-0.00008, 1.483, 0.029] relative to spine.006
  // with scale [10.9, 9.0, 11.1] — but the cap uses world-appropriate sizes
  capGroup.position.set(-0.00008, 1.48, 0.025);
  capGroup.rotation.x = -0.048; // match hair's slight tilt

  return capGroup;
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            character.traverse((child: any) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                (child as THREE.Mesh).frustumCulled = true;
              }
            });

            // Add cap to the head bone (spine.006) so it follows head movement
            const headBone = character.getObjectByName("spine006");
            if (headBone) {
              const cap = createCap();
              headBone.add(cap);
            }

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
