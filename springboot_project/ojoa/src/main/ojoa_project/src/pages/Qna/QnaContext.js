import React, { createContext, useContext, useState } from 'react';

const QnaContext = createContext();

export const QnaProvider = ({ children }) => {
    const [qnaList, setQnaList] = useState([]);

    const updateQnaList = (newList) => {
        setQnaList(newList);
    };

    return (
        <QnaContext.Provider value={{ qnaList, updateQnaList }}>
            {children}
        </QnaContext.Provider>
    );
};

export const useQnaContext = () => {
    return useContext(QnaContext);
};