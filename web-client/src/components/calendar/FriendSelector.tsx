import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
const FriendSelector: React.FC<{
  handleFriend: (value: string) => void;
}> = ({ handleFriend, userId }) => {
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    try {
      const friends = await axios.get(
        `http://34.238.117.39:3000/users/${userId}/friends`
      );
      const temp = [];
      for (let i = 0; i < friends.data.length; i++) {
        const name = friends.data[i].name;
        name && temp.push(name);
      }
      return temp;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends().then((list) => {
      setFriends(list);
    });
  }, []);

  console.log(friends);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={friends}
      sx={{
        width: 300,
        backgroundColor: '#E3DCD9',
        overflowY: 'hidden',
        py: '5px',
      }}
      onChange={(e: React.SyntheticEvent<Element, Event>) =>
        handleFriend(e.currentTarget.innerHTML)
      }
      renderInput={(params) => (
        <TextField {...params} label="Select a Playmate" />
      )}
    />
  );
};
FriendSelector.propTypes = {
  handleFriend: PropTypes.func.isRequired,
};

export default FriendSelector;
