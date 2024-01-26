import { useEffect, useState } from 'react';
import white from '../assets/blank.png';

const Draggable = ({ root, handleDefault, id, ind, parentsNum }) => {
    const [clientTop, setClientTop] = useState(0); //state variable to manage position from top
    const [clientLeft, setClientLeft] = useState(0); //state variable to manage position from left
    const [initialDrag, setInitialDrag] = useState(); //state variable for the initialDrag of the component
    const [minWidth, setMinWidth] = useState(100); //state variable to manage the dimensions of the component
    const [fontSize, setFontSize] = useState(16); //state variable to manage fontsize of the component
    
    function handleDragStart(e) {
        e.stopPropagation(); //stops the event from bubbling up any further
        
        //create a blank image to override the default drag layer.
        let blank = document.createElement('img');
        blank.src = white;
        e.dataTransfer.setDragImage(blank, 1000, 0);

        //calculate initial drag and set the value to initialDrag
        let obj = {
            x: e.pageX - clientLeft,
            y: e.pageY - clientTop,
        };
        setInitialDrag(obj);
    }

    const handleDrag = (e) => {
        e.stopPropagation();

        //calculate the new position based on the drag
        let left = (e.pageX - initialDrag.x);
        let top = (e.pageY - initialDrag.y);

        let bounds = {};

        //set bounds for draggable element based on whether it is a child element or the outermost parent element.
        if (!root) {
            bounds.x = (id + 1) * minWidth;
            bounds.y = (id + 1) * minWidth - 23;
        } else {
            bounds.x = window.innerWidth - 10;
            bounds.y = window.innerHeight - 33;
        }
        
        // Update position if it is within the bounds
        if (left + id * minWidth < bounds.x && left > 0) {
            setClientLeft(left);
        }
        if (top + id * minWidth < bounds.y && top > 0) {
            setClientTop(top);
        }

    }

    const handleDragEnd = (e) => {
        e.stopPropagation();
        setInitialDrag(null);  //reset the initialDrag state
    };

    useEffect(() => {

        //Adjust position if the outermost parent is outside of the window
        if (root) {
            const boundsX = window.innerWidth - id * minWidth - 10;
            const boundsY = window.innerHeight - id * minWidth - 10;
            setClientLeft((prevLeft) => Math.min(prevLeft, boundsX));
            setClientTop((prevTop) => Math.min(prevTop, boundsY));
        }

        //Adjust dimensions if the parent components get very big
        if (parentsNum * minWidth > window.innerWidth || parentsNum * minWidth > window.innerHeight) {
            setMinWidth(minWidth / 2);
            setFontSize(fontSize / 2);
        }
    }, [parentsNum, root, id]);
    return (
        <div
            onDragEnd={handleDragEnd}
            onDragEnter={handleDefault}
            onDragOver={handleDefault}
            style={{
                background: '#222E3E',
                position: 'relative',
                border: '1px solid grey',
                top: clientTop,
                left: clientLeft,
                width: id * minWidth,
                height: id * minWidth,
            }}
        >
            <div
                draggable
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                style={{ cursor: 'grab', border: '1px solid grey', fontSize: fontSize, }}
            >
                Title Bar {id}
            </div>
            <div>
                {id > 1 && (
                    <Draggable
                        root={false}
                        id={id - 1}
                        ind={ind + 1}
                        handleDefault={handleDefault}
                        parentsNum={parentsNum}
                    />
                )}
            </div>
        </div>
    );
};

export default Draggable;
