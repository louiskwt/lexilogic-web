import React, { useContext, useReducer } from 'react';


const PopUpContext = React.createContext();

// Set up Modal context
export function usePopUp() {
    return useContext(PopUpContext)
}

// Initial PopUp
const initialState = {
    showModal: false,
    showPage: true,
    content: 'question'
} 

// ACTIONS type
const ACTIONS = {
    CLOSE_PAGE: 'close-page',
    OPEN_PAGE: 'open-page',
    OPEN_MODAL: 'open-modal',
    CLOSE_MODAL: 'close-modal'
}

// PopUp reducer
const reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.CLOSE_PAGE:
            return {
                ...state,
                showPage: false
            };
        case ACTIONS.OPEN_PAGE:
            return {
                ...state,
                showPage: true,
                content: action.content
            };
        case ACTIONS.OPEN_MODAL:
            return {
                ...state,
                showModal: true
            };
        case ACTIONS.CLOSE_MODAL:
            return {
                ...state,
                showModal: false
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

    // Open modal 
    const openModal = () => {
        dispatch({ type: ACTIONS.OPEN_MODAL })
    }

    // Close modal 
    const closeModal = () => {
        dispatch({ type: ACTIONS.CLOSE_MODAL })
    }

    const value = {popUp, closePage, openPage, openModal, closeModal}

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
