#! /usr/bin/env node 

import inquirer from "inquirer";

interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposite(amount: number): void
    checkBalance(): void
}

class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number , balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withDraw(amount:number):void {
        if(this.balance >= amount){
            this.balance -= amount
            console.log(`withdrawl of $${amount} succesful. Remaining balance: $${this.balance}`);
        }else{
            console.log("Insufficient Balance");
        }
    }
    deposite(amount: number): void {
        if(amount > 100){
            amount -= 1;
        } this.balance += amount;
        console.log(`Deposie of $${amount} succesfully.Remaining balance: $${this.balance}`);
    }

    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
    }
}

class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string,lastName: string,gender: string, age: number,mobileNumber: number, account: BankAccount)
    {
        this.firstName =firstName;
        this.lastName =lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

const accounts: BankAccount[] = [
    new BankAccount (1001 , 500),
    new BankAccount (1002 , 1000),
    new BankAccount (1003 , 2000)
];

const customers: Customer[] = [
    new Customer ("Hamzah" , "Syed" , "Male" , 23 , 3132778983 , accounts[0]),
    new Customer ("Taha" , "Khan" , "Male" , 21, 3162671498 , accounts[1]),
    new Customer ("Anas" , "Syed" , "Male" , 25 , 3353571530 , accounts[2])
]

async function Service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "select an operation",
                choices: ["Deposite" , "Withdraw", "CheckBalance" , "Exit"]
            }]);

            switch(ans.select){
                case "Deposite":
                    const depositeAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposite:"
                    })

                    customer.account.deposite(depositeAmount.amount)
                    break;

                    case "Withdraw":
                    const withDrawAmmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    })

                    customer.account.withDraw(withDrawAmmount.amount)
                    break;

                    case "CheckBalance" :
                        customer.account.checkBalance();
                        break;
                    case "Exit" :
                        console.log("Exiting bank program.....");
                        console.log("\n Thank you for using our services.Have a great day!!");
                        return;
                    
                    
            }
        }else{
            console.log("Invalid account number .please try again.");
        }
    }while(true)
}

Service()

