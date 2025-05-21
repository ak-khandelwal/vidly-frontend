import { useDispatch, useSelector } from "react-redux";
import { selectCurrentChannel, setActive } from "../app/slices/channelSlice";
import PlayList from "../components/PlayList";
import {
  clearPlayListState,
  getUserPlaylists,
  selectCurrentPlayLists,
} from "../app/slices/playListSlice";
import { useEffect } from "react";

function ChannelPlaylist() {
  const dispatch = useDispatch();
  const playList = useSelector(selectCurrentPlayLists);
  const user = useSelector(selectCurrentChannel);
  useEffect(() => {
    dispatch(setActive([0, 1, 0, 0]));
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      dispatch(clearPlayListState());
      dispatch(getUserPlaylists({ userId: user._id }));
    }
  }, [dispatch, user]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {playList.map((items, i) => (
        <PlayList
          key={i}
          thumbnail={items.thumbnail}
          description={items.description}
          playlistName={items.playlistName}
          playlistId={items._id}
          videos={items.videos}
        />
      ))}
    </div>
  );
}

export default ChannelPlaylist;
