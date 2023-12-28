import React from "react";

const PostButton = ({ onPostComplete }) => {
  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/examples/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
        // You can pass data in the body if required
        body: JSON.stringify({ name: 'Paul', description:'description', date:Date.now() }),
      });

      if (response.ok) {
        console.log('POST request successful');
        // You can handle success logic here
      } else {
        console.error('POST request failed');
        // You can handle error logic here
      }
      onPostComplete();
    } catch (error) {
      console.error('Error during POST request:', error);
      // You can handle error logic here
      onPostComplete();
      
    }
  };

  return (
    <button onClick={handleClick}>
      Add row
    </button>
  );
}

export default PostButton;