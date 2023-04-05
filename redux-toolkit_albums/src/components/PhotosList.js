import React from "react";

import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotosListItem from "./PhotosListItem";

function PhotosList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResult] = useAddPhotoMutation();

  const handleAddPhoto = () => addPhoto(album);

  let content;
  if (isFetching) {
    content = <Skeleton class="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else {
    content = data.map((photo) => (
      <PhotosListItem key={photo.id} photo={photo} />
    ));
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-xl font-bold">Photos In {album.title}</h3>
        <Button loading={isFetching} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="flex flex-row flex-wrap gap-2">{content}</div>
    </div>
  );
}

export default PhotosList;
