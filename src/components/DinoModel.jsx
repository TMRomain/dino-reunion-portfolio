import { DinoGLTFModel, ModelLoader } from './RealModels';

const DinoModel = ({ position = [0, 0, 0], ...props }) => {
  return (
    <ModelLoader name="Dinosaure">
      <DinoGLTFModel position={position} scale={0.5} {...props} />
    </ModelLoader>
  );
};

export default DinoModel;
