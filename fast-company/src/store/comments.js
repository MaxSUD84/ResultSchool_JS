import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFaild: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentCreateFailed: (state, action) => {
            state.error = action.payload;
        },
        commentDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload._id
            );
        },
        commentDeleteFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFailed,
    commentCreated,
    commentCreateFailed,
    commentDeleted,
    commentDeleteFailed
} = actions;

const createCommentRequested = createAction("users/createCommentRequested");
const deleteCommentRequested = createAction("users/deleteCommentRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (payload) => async (dispatch) => {
    dispatch(createCommentRequested());
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentCreateFailed(error.message));
    }
};

export const deleteComment = (commentId) => async (dispatch) => {
    dispatch(deleteCommentRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        // console.log(content);
        if (content === null) {
            dispatch(commentDeleted({ _id: commentId }));
        }
    } catch (error) {
        dispatch(commentDeleteFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
