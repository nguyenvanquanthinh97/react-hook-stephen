import React from "react";
import { GoTrashcan } from "react-icons/go";

import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { useRemoveAlbumMutation } from "../store";
import PhotoList from "./PhotosList";

function AlbumListItem({ album }) {
  const [deleteAlbum, { isLoading }] = useRemoveAlbumMutation();

  const header = (
    <>
      <Button
        className="mr-2"
        loading={isLoading}
        onClick={() => deleteAlbum(album)}
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <PhotoList album={album} />
    </ExpandablePanel>
  );
}

export default AlbumListItem;
