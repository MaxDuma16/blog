import React, {useState} from "react";
import c from  './AddPostForm.module.css';

const AddPostForm = ({ onHandleSubmit, btnText }) => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextarea] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if ( inputValue && textareaValue) {
      onHandleSubmit(inputValue, textareaValue);
      const reset = "";
      setInputValue(reset);
      setTextarea(reset);
    } else {
      //Error Form
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    }
  }

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  }
  const onChangeTextarea = (event) => {
    setTextarea(event.target.value);
  }

  return (
    <div>
       <form  className={c.formWrapper} onSubmit={handleSubmit}> 
          <input 
            className={c.input}
            type='text'
            placeholder="Type title..."
            onChange={onChangeInput}
            value={inputValue}
            />
          <textarea 
            className={c.textarea}
            type='text'
            placeholder="Type something..."
            onChange={onChangeTextarea}
            value={textareaValue}
            />
          { isError && <div className={c.error}>
            One or both fields are empty!
          </div>}
        <button  className={c.btnAddPost} type="submit">{btnText}</button>
        </form>
    </div>
  );
};

export default AddPostForm;