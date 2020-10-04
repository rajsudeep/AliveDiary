import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { initialValue } from './slateInitialValue';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

interface Props {}

export const SyncingEditor: React.FC<Props> = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const id = useRef(`${Date.now()}`);
    const [value, setValue] = useState<any>(initialValue);
    const remote = useRef(false);

    useEffect(() => {
        socket.on('new-remote-values', ({editorId, newValue}: {editorId: string, newValue: any}) => {
            if (id.current !== editorId) {
                remote.current = true;
                setValue(newValue);
                remote.current = false;
            }
        })
    }, []);

    const onChangeSlate = (newValue: any) => {
        setValue(newValue);
        if (newValue !== value && !remote.current) {
            socket.emit('new-values', { 
                editorId: id.current, 
                newValue: newValue 
            });
        }
    };

    return (
        <Slate editor={editor} value={value} onChange={onChangeSlate}>
            <Editable
                style={{
                    backgroundColor: '#E7EEE7',
                    maxWidth: '80rem',
                    minHeight: '15rem'
                }}
            />
        </Slate>
    )
}