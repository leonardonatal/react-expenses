import './ExpenseForm.css';
import { useState } from 'react';

const ExpenseForm = (props) => {
    // separate approach of one state each
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    // entire form as an object 
    const [userInput, setUserInput] = useState({
        title: '',
        amount: '',
        date: ''  
    });

    const formHandler = (event) => {
        setUserInput({
            ...userInput,
            title: event.target.value
        })
    };
    // end of object handler for the form
    //alternatively you could use the previous state as a parameter

    const formPrevHandler = (event) => {
        setUserInput((prevState) => {
            return { ...prevState, enteredTitle: event.target.value };
        });
    };



    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: +enteredAmount,
            date: new Date(enteredDate)
        };
        props.onSaveExpenseData(expenseData);

        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control '>
                    <label>Title</label>
                    <input type="text" value={enteredTitle} onChange={titleChangeHandler}></input>
                </div>
                <div className='new-expense__control '>
                    <label>Amount</label>
                    <input type="numer" min='0.01' step="0.01" value={enteredAmount} onChange={amountChangeHandler}></input>
                </div>
                <div className='new-expense__control '>
                    <label>Date</label>
                    <input type="date" min="2019-01-01" max="2022-12-31" value={enteredDate} onChange={dateChangeHandler}></input>
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button type="submit">Add Expense</button>
            </div>
        </form> 
    );
};

export default ExpenseForm;