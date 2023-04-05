import React from "react";

import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  const { data, isLoading, error } = useFetchAlbumsQuery(user);
  const [addAlbum, { isLoading: isAddAlbumLoading }] = useAddAlbumMutation();

  const handleAddAlbum = () => addAlbum(user);

  let content;
  if (isLoading) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>There is error when fetch albums</div>;
  } else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-around">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={isAddAlbumLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
