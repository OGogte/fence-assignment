import { useEffect, useState } from 'react';
import white from '../assets/blank.png';

const Draggable = ({ root, handleDefault, id, ind, parentsNum }) => {
    const [clientTop, setClientTop] = useState(0);
    const [clientLeft, setClientLeft] = useState(0);
    const [initialDrag, setInitialDrag] = useState();
    const [minWidth, setMinWidth] = useState(100);
    const [fontSize, setFontSize] = useState(16);
    function handleDragStart(e) {
        e.stopPropagation();
        console.log(e, id);
        let blank = document.createElement('img');
        blank.src = white;
        e.dataTransfer.setDragImage(blank, 1000, 0);

        let obj = {
            x: e.pageX - clientLeft,
            y: e.pageY - clientTop,
        };
        setInitialDrag(obj);
    }

    const handleDrag = (e) => {
        e.stopPropagation();
        let left = (e.pageX - initialDrag.x);
        let top = (e.pageY - initialDrag.y);

        let bounds = {};
        console.log(root)
        if (!root) {
            bounds.x = (id + 1) * minWidth;
            bounds.y = (id + 1) * minWidth - 23;
        } else {
            bounds.x = window.innerWidth;
            bounds.y = window.innerHeight;
        }

        if (left + id * minWidth < bounds.x && left > 0) {
            setClientLeft(left);
        }
        if (top + id * minWidth < bounds.y && top > 0) {
            setClientTop(top);
        }

    }

    const handleDragEnd = (e) => {
        e.stopPropagation();
        setInitialDrag(null);
    };

    useEffect(() => {
        if (root) {
            const boundsX = window.innerWidth - id * minWidth;
            const boundsY = window.innerHeight - id * minWidth;
            setClientLeft((prevLeft) => Math.min(prevLeft, boundsX));
            setClientTop((prevTop) => Math.min(prevTop, boundsY));
        }
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
