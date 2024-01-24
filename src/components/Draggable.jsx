import { useEffect, useState } from 'react';
import white from '../assets/blank.png';

const Draggable = ({ root, handleDefault, id, ind, parentsNum }) => {
    const [clientTop, setClientTop] = useState(0);
    const [clientLeft, setClientLeft] = useState(0);
    const [initialDrag, setInitialDrag] = useState();

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
            bounds.x = (id + 1) * 100;
            bounds.y = (id + 1) * 100 -23;
        } else {
            bounds.x = window.innerWidth;
            bounds.y = window.innerHeight;
        }

        if (left + id * 100 < bounds.x && left > 0) {
            setClientLeft(left);
        }
        if (top + id * 100 < bounds.y && top > 0) {
            setClientTop(top);
        }

    }

    const handleDragEnd = (e) => {
        e.stopPropagation();
        setInitialDrag(null);
    };

    useEffect(() => {
        if (root) {
            const boundsX = window.innerWidth - id * 100;
            const boundsY = window.innerHeight - id * 100;

            setClientLeft((prevLeft) => Math.min(prevLeft, boundsX));
            setClientTop((prevTop) => Math.min(prevTop, boundsY));
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
                width: id * 100,
                height: id * 100,
            }}
        >
            <div
                draggable
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                style={{ cursor: 'grab', border: '1px solid grey', }}
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
