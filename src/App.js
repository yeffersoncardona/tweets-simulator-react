import React, { useState, useEffect } from 'react';
import { Container, Snackbar } from "@material-ui/core";
import Header from "./components/Header";
import SendTweet from "./components/SendTweet";
import { TWEETS_STORAGE } from "./utils/constants";
import ListTweets from "./components/ListTweets";
import { Alert } from '@material-ui/lab';


function App() {
  const [toastProps, setToastProps] = useState({
    open: false,
    text: null,
    severity: null
  });
  const [allTweets, setAllTweets] = useState([]);
  const [reloadTweets, setReloadTweets] = useState(false);
  useEffect(() => {
    const AllTweetsStorage = localStorage.getItem(TWEETS_STORAGE);
    const allTweestsArray = JSON.parse(AllTweetsStorage);
    setAllTweets(allTweestsArray);
    setReloadTweets(false);
  }, [reloadTweets]);
  const deleteTweet = (index) => {
    allTweets.splice(index, 1);
    setAllTweets(allTweets);
    localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweets));
    setReloadTweets(true);
  }
  const handleClose = () => {
    setToastProps({
      ...toastProps,
      open: false,
    });
  };
  return (
    <Container className="tweets-simulator" maxWidth={false} >
      <Header />
      <SendTweet setToastProps={setToastProps} allTweets={allTweets} />
      <ListTweets allTweets={allTweets} deleteTweet={deleteTweet} />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={toastProps.open}
        autoHideDuration={2000}

        onClose={handleClose}
      >
        <Alert severity={toastProps.severity} >{<span id="message-id">{toastProps.text}</span>}</Alert>
      </Snackbar>

    </Container >
  );
}

export default App;
