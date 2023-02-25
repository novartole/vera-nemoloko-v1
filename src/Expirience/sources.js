export class SourceTypes {
  static TEXTURE = 'texture';
  static GLTF_TEXTURE = 'gltfTexture';
  static CUBE_TEXTURE = 'cubeTexture';
  static DESCRIPTION = 'json';
}

export default 
[
  // {
  //   name: 'environmentMapTexture',
  //   type: 'cubeTexture',
  //   path: 
  //   [
  //     '/textures/environmentMap/px.jpg',
  //     '/textures/environmentMap/nx.jpg',
  //     '/textures/environmentMap/py.jpg',
  //     '/textures/environmentMap/ny.jpg',
  //     '/textures/environmentMap/pz.jpg',
  //     '/textures/environmentMap/nz.jpg'
  //   ]
  // },
  {
    name: 'testModelTexture',
    type: SourceTypes.TEXTURE,
    path: 'textures/gradients/3.jpg'
  },
  {
    name: 'testModelDescription',
    type: SourceTypes.DESCRIPTION,
    path: 'descriptions/testModelDescription.txt'
  },
  {
    // V
    name: 'v_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/V.png'
  },
  {
    // E_0
    name: 'e0_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/E.png'
  },
  {
    // R
    name: 'r_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/R.png'
  },
  {
    // A
    name: 'a_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/A.png'
  },
  {
    // N
    name: 'n_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/N.png'
  },
  {
    // M
    name: 'm_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/M.png'
  },
  {
    // O_0
    name: 'o0_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/O1.png'
  },
  {
    // L
    name: 'l_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/L.png'
  },
  {
    // O_1
    name: 'o1_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/O2.png'
  },
  {
    // K
    name: 'k_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/K.png'
  },
  {
    // O_2
    name: 'o2_letter',
    type: SourceTypes.TEXTURE,
    path: 'textures/letters/O3.png'
  },
  // {
  //   name: 'foxModel',
  //   type: 'gltfTexture',
  //   path: 'models/Fox/glTF/Fox.gltf'
  // }
]