import React, { useEffect, useRef, useState } from "react";
import { ItemWrapper, StyledSelectWrapper } from "./Dropdown.styles";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Dropdown = ({ className, title = "Select...", option, onChange }) => {
  const [value, setValue] = useState(title);
  const [dropDown, setDropDown] = useState(false);
  const closeRef = useRef();
  function handelChange(elem) {
    setValue(elem);
    setDropDown(!dropDown);
    onChange(elem);
  }
  const handleClickOutside = (event) => {
    if (closeRef.current && !closeRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };
  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <StyledSelectWrapper
      className={className}
      ref={closeRef}
      $active={dropDown}
    >
      <div className="textFilter" onClick={() => setDropDown(!dropDown)}>
        {value.label ? <span>{value.label}</span> : <span>{title}</span>}
        <div className="iconWrap">
          <MdOutlineKeyboardArrowDown
            size="24"
            color={"rgba(64, 143, 140, 1)"}
          />
        </div>
      </div>
      <ItemWrapper $height={dropDown}>
        {option?.map((elem, ind) => (
          <li key={ind} onClick={() => handelChange(elem)}>
            {elem.label}
          </li>
        ))}
      </ItemWrapper>
    </StyledSelectWrapper>
  );
};

export default Dropdown;
