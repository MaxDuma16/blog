import React, {useState} from "react";
import c from  './FormComment.module.css';

const FormComment = ({ onHandleSubmit, btnText }) => {
  const [textareaValue, setTextarea] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (textareaValue) {
      onHandleSubmit(textareaValue);
      const reset = "";
      setTextarea(reset);
    } else {
      //Error Form
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    }
  }

  const onChangeTextarea = (event) => {
    setTextarea(event.target.value);
  }

  return (
    <div>
       <form  className={c.formWrapper} onSubmit={handleSubmit}> 
          <div className={c.wrapper}>
            <div >
              <textarea 
              className={c.textarea}
              type='text'
              placeholder="Write your comment ..."
              onChange={onChangeTextarea}
              value={textareaValue}
              />
            </div>
            <div>
              <button  className={c.btnAddComment} type="submit">{btnText}</button>
            </div>
          </div>
          { isError && <div className={c.error}>
          The field is empty!
          </div>}
        </form>
    </div>
  );
};

export default FormComment;