import React from "react";
import { GoTrashcan } from "react-icons/go";

import { useRemovePhotoMutation } from "../store";

function PhotosListItem({ photo }) {
  const [removePhoto] = useRemovePhotoMutation();

  const handleRemovePhoto = () => removePhoto(photo);

  return (
    <div className="relative cursor-pointer">
      <img className="w-20 h-20" src={photo.url} alt="random pic" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-80 hover:bg-slate-200">
        <GoTrashcan className="text-3xl" onClick={handleRemovePhoto} />
      </div>
    </div>
  );
}

export default PhotosListItem;
