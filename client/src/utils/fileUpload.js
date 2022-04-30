import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const uploadImage = async (imageFile) => {
  try {
    const imageName = `${Date.now()}${imageFile.name.split(".")[0]}`;

    const storageRef = ref(storage, "recipeImages/" + imageName);

    const uploadTask = await uploadBytesResumable(storageRef, imageFile);

    const imageURL = await getDownloadURL(uploadTask.ref);

    return { imageURL, imageName };
  } catch (error) {
    // handles unsuccessful upload
    return error;
  }
};

export default uploadImage;
