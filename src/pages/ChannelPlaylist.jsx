import { useDispatch, useSelector } from "react-redux";
import { selectCurrentChannel, setActive } from "../app/slices/channelSlice";
import PlayList from "../components/PlayList";
import {
  clearPlayListState,
  getUserPlaylist,
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
      dispatch(getUserPlaylist({ userId: user._id }));
    }
  }, [dispatch, user]);

  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {playList.map((items, i) => (
        <PlayList
          key={i} // Use a unique identifier for better rendering
          thumbnail={items.thumbnail}
          description={items.description}
          playlistName={items.playlistName}
        />
      ))}
    </div>
  );
}

export default ChannelPlaylist;
