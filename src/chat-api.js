function ChatAPI() {
  const friends = [
    {
      id: 1,
      status: "online"
    },
    {
      id: 2,
      status: "offline"
    }
  ];
  const subscriptions = [];

  function changeStatus(friendId) {
    console.log(friendId);
    let statusToBedispatched;
    friends.forEach(friend => {
      if (friend.id === friendId) {
        friend.status = friend.status === "online" ? "offline" : "online";
        statusToBedispatched = friend.status;
      }
    });

    subscriptions.forEach(subscription => {
      if (subscription.id === friendId) {
        subscription.callback.apply(null, [statusToBedispatched]);
      }
    });
  }

  // setInterval(() => {
  //   const frirndId = Math.floor(Math.random() * 2) + 1;
  //   changeStatus(frirndId);
  // }, 60000);

  return {
    subscribe: function(friendID, callback) {
      let alreadySubscribed = false;
      subscriptions.forEach(subscription => {
        if (subscription.id === friendID) {
          alreadySubscribed = true;
        }
      });
      if (!alreadySubscribed) {
        subscriptions.push({ id: friendID, callback });
      }
      setTimeout(() => {
        changeStatus(friendID);
      }, 1000);
    },
    unsubscribe: function(friendID) {
      let foundItemAtIndex = -1;
      subscriptions.forEach((subscription, index) => {
        if (subscription.id === friendID) {
          foundItemAtIndex = index;
        }
      });
      if (foundItemAtIndex > -1) {
        subscriptions.splice(foundItemAtIndex, 1);
      }
    }
  };
}

export default ChatAPI();
