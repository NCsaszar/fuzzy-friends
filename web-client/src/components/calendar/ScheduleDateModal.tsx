import React, { useEffect, useState } from 'react';
import { Box, Modal, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { default as TimeSelectors } from './TimeSelectors';
import { default as FriendSelector } from './FriendSelector';
import { default as Location } from './Location';
import { Dayjs } from 'dayjs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#E3DCD9',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

interface ScheduleDateModalProps {
  modalIsOpen: boolean;
  handleDayClick: (event: string, payload?: object) => void;
  playEvent: PlayEvent;
  dateStr: string;
  userId: string | number;
}

const blankPlayEvent: PlayEvent = {
  _id: '',
  userId: 'test',
  title: 'Playdate',
  description: '',
  friend: '',
  location: '',
  start: '',
  end: '',
  date: new Date(),
};

const ScheduleDateModal: React.FC<ScheduleDateModalProps> = ({
  modalIsOpen,
  handleDayClick,
  playEvent,
  dateStr,
  userId,
}) => {
  const [form, setForm] = useState(playEvent);
  const [fakeDate, setFakeDate] = useState(dateStr);
  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    setForm(playEvent);
  }, [playEvent]);

  const handleTime = (start: Dayjs | null, end: Dayjs | null) => {
    if (start !== null && end !== null) {
      const startTime = start.toDate();
      const formattedStartTime = startTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });
      const endTime = end.toDate();
      const formattedEndTime = endTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });

      console.log('times:', formattedStartTime, formattedEndTime);
      setForm({
        ...form,
        ['start']: formattedStartTime,
        ['end']: formattedEndTime,
      });
    }
  };

  const handleLocation = (str: string) => {
    const name = 'location';
    const value = str;

    setForm({ ...form, [name]: value });
  };

  const handleFriend = (str: string) => {
    const name = 'friend';
    const value = str;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (e) => {
    setFakeDate(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.innerText === 'SCHEDULE') {
      const ds = new Date(fakeDate);
      ds.setDate(ds.getDate() + 1);
      form.date = ds;
      delete form['_id'];
      console.log('what am I sending:', form);
      axios
        .post(`http://34.238.117.39:3000/users/${userId}/events`, form)
        .then((resp) => console.log(resp))
        .catch((err) => console.log('posting error:', err))
        .finally(() => {
          setSubmitted(true);
          setForm(blankPlayEvent);
          handleDayClick('ADDED');
        });
      setValue(null);
      setInputValue('');
      setStartTime(null);
      setEndTime(null);
    } else {
      const ds = new Date(fakeDate);
      ds.setDate(ds.getDate() + 1);
      form.date = ds;
      axios
        .put(`http://34.238.117.39:3000/users/${userId}/events`, form)
        .then((resp) => console.log('PUT SUCCESS', resp))
        .catch((err) => console.log('put error:', err))
        .finally(() => handleDayClick('EDITED'));
    }
  };

  const handleDelete = () => {
    //
    console.log('send a delete with:', form._id);
    axios
      .delete(`http://34.238.117.39:3000/users/${userId}/events`, {
        params: { _id: form._id },
      })
      .then(() => {
        console.log('deletred');
      })
      .catch((err) => console.log('error deleting:', err))
      .finally(() => handleDayClick('DELETED'));
  };

  const ModalStyles = {
    minWidth: '30px',
    color: 'white',
    bgcolor: '#494036',
    transition: 'transform 0.1s ease-in-out',
    ':hover': {
      transform: 'scale(1.1)',
      bgcolor: '#494036',
    },
  };

  const formatDate = (ds: Date) => {
    if (ds instanceof Date) {
      return ds.toLocaleDateString();
    }
    return 'bad date';
  };

  return (
    <div>
      <Modal
        open={modalIsOpen}
        onClose={() => handleDayClick('CLOSE')}
        keepMounted
        aria-labelledby="keep-mounted-modal"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              direction: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Typography
              id="keep-mounted-modal"
              component="h4"
              variant="h4"
              sx={{
                color: '#494036',
                bgcolor: '#E3DCD9',
                margin: '0 auto',
                position: 'absolute',
                left: 135,
              }}
            >
              Schedule a Playdate
            </Typography>
            <Box sx={{ display: 'flex', direction: 'row', gap: 2 }}>
              {form._id !== '' && (
                <Button onClick={handleDelete} sx={ModalStyles}>
                  <DeleteForeverIcon />
                </Button>
              )}
              <Button onClick={() => handleDayClick('CLOSE')} sx={ModalStyles}>
                <CloseIcon />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              direction: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '15px',
            }}
          >
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '20rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Playdate Title"
                variant="outlined"
                name="title"
                value={form.title}
                defaultValue={form.title}
                required={true}
                size="medium"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e)
                }
              />
              <TimeSelectors
                handleTime={handleTime}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <Location
                handleLocation={handleLocation}
                value={value}
                setValue={setValue}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
              <TextField
                id="outlined-basic"
                label="Date"
                variant="outlined"
                name="date"
                value={fakeDate}
                defaultValue={dateStr}
                required={true}
                onChange={handleDateChange}
              />
              <FriendSelector handleFriend={handleFriend} userId={userId} />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                name="description"
                value={form.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e)
                }
              />
              <Box
                sx={{
                  display: 'flex',
                  direction: 'row',
                  justifyContent: 'center',
                  '& > :not(style)': { m: 1, width: '15rem' },
                }}
              >
                <Button
                  onClick={handleSubmit}
                  sx={{
                    height: '35px',
                    width: '35px',
                    color: 'white',
                    bgcolor: '#494036',
                    transition: 'transform 0.1s ease-in-out',
                    ':hover': {
                      transform: 'scale(1.1)',
                      backgroundColor: '#494036',
                    },
                  }}
                >
                  {form._id === '' ? 'Schedule' : 'Update'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ScheduleDateModal;
