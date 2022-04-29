import React, { useContext, useReducer } from 'react';


const PopUpContext = React.createContext();

// Set up Modal context
export function usePopUp() {
    return useContext(PopUpContext)
}

// Initial PopUp
const initialState = {
    modal: 'none',
    page: '100%',
    content: 'question'
} 

// ACTIONS type
const ACTIONS = {
    CLOSE_PAGE: 'close-page',
    OPEN_PAGE: 'open-page',
}

// PopUp reducer
const reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.CLOSE_PAGE:
            return {
                ...state,
                page: '0%'
            };
        case ACTIONS.OPEN_PAGE:
            return {
                ...state,
                page: '100%',
                content: action.content
            }
        default: 
            return state
    }
}


// Popup provider
export function PopUpProvider({children}) {
    // Set up reducer hook
    const [popUp, dispatch] = useReducer(reducer, initialState)

    // Open Page
    const openPage = (content) => {
        dispatch({type: ACTIONS.OPEN_PAGE, content})
    }

    // Close Page
    const closePage = () => {
        dispatch({type: ACTIONS.CLOSE_PAGE})
    }

    const value = {popUp, closePage, openPage}

    return (
        <PopUpContext.Provider value={value}>
            {children}
        </PopUpContext.Provider>
    )
}



// // modal state
// const [modalState, setModalState] = useState('none')

// // overlay state
// const [page, setPage] = useState('100%')

// // page content
// const [pageContent, setPageContent] = useState('question')


// // modal context values
// const popUp = { modalState, setModalState, page, setPage, pageContent, setPageContent }
