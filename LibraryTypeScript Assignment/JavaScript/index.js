"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let currentLoggedUserID;
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5119/api/userdetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        return yield response.json();
    });
}
function fetchBook() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5119/api/bookdetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        return yield response.json();
    });
}
function fetchBorrow() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5119/api/borrowdetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch borrow details');
        }
        return yield response.json();
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5119/api/userdetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add User');
        }
    });
}
function addBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5119/api/bookdetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to add book');
        }
    });
}
function addBorrow(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5119/api/borrowdetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to add borrow');
        }
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5119/api/userdetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
function updateBook(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5119/api/bookdetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to update book');
        }
    });
}
function updateBorrow(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5119/api/borrowdetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to update borrow');
        }
    });
}
function deleteBook(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5119/api/bookdetails/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    });
}
function SignIn() {
    let SignIn = document.getElementById("SignIn");
    SignIn.style.display = "block";
    let SignUp = document.getElementById("SignUp");
    SignUp.style.display = "none";
}
function Enter() {
    return __awaiter(this, void 0, void 0, function* () {
        let SignInEmailID = document.getElementById("SignInEmailID");
        let SignInPassword = document.getElementById("SignInPassword");
        const user = yield fetchUser();
        user.forEach(users => {
            if (users.userEmail == SignInEmailID.value) {
                if (users.userPassword == SignInPassword.value) {
                    currentLoggedUserID = users.userID;
                    alert("Login Successful");
                    document.getElementById("Main").style.display = "none";
                    document.getElementById("BodyPage").style.display = "block";
                    HomeTab();
                    SignInCancel();
                }
                else {
                    alert("Invalid Password");
                }
            }
        });
    });
}
function SignInCancel() {
    let SignInEmailID = document.getElementById("SignInEmailID");
    let SignInPassword = document.getElementById("SignInPassword");
    SignInEmailID.value = "";
    SignInPassword.value = "";
}
function SignUp() {
    let SignUp = document.getElementById("SignUp");
    SignUp.style.display = "block";
    let SignIn = document.getElementById("SignIn");
    SignIn.style.display = "none";
}
function Confirm() {
    return __awaiter(this, void 0, void 0, function* () {
        let SignUpName = document.getElementById("SignUpName");
        let SignUpEmailID = document.getElementById("SignUpEmailID");
        let SignUpPassword = document.getElementById("SignUpPassword");
        let SignUpConfirmPassword = document.getElementById("SignUpConfirmPassword");
        let SignUpGender = document.getElementById("SignUpGender");
        let GenderMale = document.getElementById("GenderMale");
        let GenderFemale = document.getElementById("GenderFemale");
        let GenderOthers = document.getElementById("GenderOthers");
        let SignUpDepartment = document.getElementById("SignUpDepartment");
        let SignUpPhone = document.getElementById("SignUpPhone");
        let SignUpWalletBalance = document.getElementById("SignUpWalletBalance");
        let SelectedGender = "";
        let flag = true;
        if (GenderMale.selected) {
            SelectedGender = GenderMale.value;
        }
        else if (GenderFemale.selected) {
            SelectedGender = GenderFemale.value;
        }
        else if (GenderOthers.selected) {
            SelectedGender = GenderOthers.value;
        }
        else {
            alert("Please select a gender");
            flag = false;
            //SignUpGender.style.border = "red 0.1rem solid";
        }
        if (flag == true) {
            const NewUser = {
                userID: 0,
                userName: SignUpName.value,
                userEmail: SignUpEmailID.value,
                userPassword: SignUpPassword.value,
                userConfirmPassword: SignUpConfirmPassword.value,
                gender: SelectedGender,
                department: SignUpDepartment.value,
                mobileNumber: SignUpPhone.value,
                walletBalance: Number(SignUpWalletBalance.value)
            };
            addUser(NewUser);
            alert("Registration Successful");
            SignUpCancel();
        }
    });
}
function SignUpCancel() {
    let SignUpName = document.getElementById("SignUpName");
    let SignUpEmailID = document.getElementById("SignUpEmailID");
    let SignUpPassword = document.getElementById("SignUpPassword");
    let SignUpConfirmPassword = document.getElementById("SignUpConfirmPassword");
    let SignUpGender = document.getElementById("SignUpGender");
    let Select = document.getElementById("Select");
    let SignUpDepartment = document.getElementById("SignUpDepartment");
    let SignUpPhone = document.getElementById("SignUpPhone");
    let SignUpWalletBalance = document.getElementById("SignUpWalletBalance");
    SignUpName.value = "";
    SignUpEmailID.value = "";
    SignUpPassword.value = "";
    SignUpConfirmPassword.value = "";
    SignUpDepartment.value = "";
    SignUpPhone.value = "";
    SignUpWalletBalance.value = "";
}
function HomeTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let HomeTab = document.getElementById("HomeTab");
        HomeTab.style.display = "block";
        let ReturnBooksTab = document.getElementById("ReturnBooksTab");
        ReturnBooksTab.style.display = "none";
        let BorrowBookTab = document.getElementById("BorrowBookTab");
        BorrowBookTab.style.display = "none";
        let BookDetailsTab = document.getElementById("BookDetailsTab");
        BookDetailsTab.style.display = "none";
        let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab");
        BorrowBookHistoryTab.style.display = "none";
        let WalletRechargeTab = document.getElementById("WalletRechargeTab");
        WalletRechargeTab.style.display = "none";
        let WalletBalanceTab = document.getElementById("WalletBalanceTab");
        WalletBalanceTab.style.display = "none";
        let WelcomeName = document.getElementById("WelcomeName");
        const user = yield fetchUser();
        user.forEach(users => {
            if (users.userID == currentLoggedUserID) {
                WelcomeName.innerText = users.userName;
            }
        });
    });
}
function SignoutTab() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("BodyPage").style.display = "none";
        document.getElementById("Main").style.display = "block";
    });
}
function BookDetailsTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let BookDetailsTab = document.getElementById("BookDetailsTab");
        BookDetailsTab.style.display = "block";
        let ReturnBooksTab = document.getElementById("ReturnBooksTab");
        ReturnBooksTab.style.display = "none";
        let BorrowBookTab = document.getElementById("BorrowBookTab");
        BorrowBookTab.style.display = "none";
        let HomeTab = document.getElementById("HomeTab");
        HomeTab.style.display = "none";
        let NewBookDetailsTab = document.getElementById("NewBookDetailsTab");
        NewBookDetailsTab.style.display = "none";
        let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab");
        BorrowBookHistoryTab.style.display = "none";
        let WalletRechargeTab = document.getElementById("WalletRechargeTab");
        WalletRechargeTab.style.display = "none";
        let WalletBalanceTab = document.getElementById("WalletBalanceTab");
        WalletBalanceTab.style.display = "none";
        let BookTable = document.getElementById("BookTable");
        BookTable.innerHTML = `<tr>
        <th>Book ID</th>
        <th>Book Name</th>
        <th>Author Name</th>
        <th>Book Count</th>
        <th>Action</th>
    </tr>`;
        const book = yield fetchBook();
        book.forEach(books => {
            BookTable.innerHTML += `<tr><td>${books.bookID}</td><td>${books.bookName}</td><td>${books.authorName}</td><td>${books.bookCount}</td><td><button onclick = EditBook("${books.bookID}")>Edit</button><button onclick = DeleteBook("${books.bookID}")>Delete</button></td></tr>`;
        });
    });
}
function AddNewBook() {
    let NewBookDetailsTab = document.getElementById("NewBookDetailsTab");
    NewBookDetailsTab.style.display = "block";
}
function AddNewBookToList() {
    let NewBookName = document.getElementById("NewBookName");
    let NewAuthorName = document.getElementById("NewAuthorName");
    let NewBookCount = document.getElementById("NewBookCount");
    if (NewBookName.value != "" && NewBookCount.value != "" && NewAuthorName.value != "") {
        const NewBook = {
            bookID: 0,
            bookName: NewBookName.value,
            authorName: NewAuthorName.value,
            bookCount: Number(NewBookCount.value)
        };
        addBook(NewBook);
        alert("Book Added Successfully");
        CancelNewBook();
        BookDetailsTab();
        let NewBookDetailsTab = document.getElementById("NewBookDetailsTab");
        NewBookDetailsTab.style.display = "none";
    }
    else {
        alert("Invalid Book Details");
    }
}
function CancelNewBook() {
    let NewBookName = document.getElementById("NewBookName");
    let NewAuthorName = document.getElementById("NewAuthorName");
    let NewBookCount = document.getElementById("NewBookCount");
    NewBookName.value = "";
    NewAuthorName.value = "";
    NewBookCount.value = "";
}
function DeleteBook(DeleteBookID) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield fetchBook();
        book.forEach(books => {
            if (books.bookID == DeleteBookID) {
                deleteBook(books.bookID, books);
                updateBook(books.bookID, books);
                alert(books.bookName + " Book Deleted Successfully");
                BookDetailsTab();
            }
        });
    });
}
function BorrowBookTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let BorrowBookTab = document.getElementById("BorrowBookTab");
        BorrowBookTab.style.display = "block";
        let ReturnBooksTab = document.getElementById("ReturnBooksTab");
        ReturnBooksTab.style.display = "none";
        let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab");
        BorrowBookHistoryTab.style.display = "none";
        let BookDetailsTab = document.getElementById("BookDetailsTab");
        BookDetailsTab.style.display = "none";
        let HomeTab = document.getElementById("HomeTab");
        HomeTab.style.display = "none";
        let WalletRechargeTab = document.getElementById("WalletRechargeTab");
        WalletRechargeTab.style.display = "none";
        let WalletBalanceTab = document.getElementById("WalletBalanceTab");
        WalletBalanceTab.style.display = "none";
        let BorrowTable = document.getElementById("BorrowTable");
        BorrowTable.innerHTML = `<tr>
        <th>Book ID</th>
        <th>Book Name</th>
        <th>Author Name</th>
        <th>Book Count</th>
        <th>Action</th>
    </tr>`;
        const book = yield fetchBook();
        book.forEach(books => {
            BorrowTable.innerHTML += `<tr><td>${books.bookID}</td><td>${books.bookName}</td><td>${books.authorName}</td><td>${books.bookCount}</td><td><button onclick = BorrowBook("${books.bookID}")>Borrow</button></td></tr>`;
        });
    });
}
function BorrowBook(BorrowBookID) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield fetchBook();
        const borrow = yield fetchBorrow();
        const user = yield fetchUser();
        let BookQuantity = document.getElementById("BookQuantity");
        let BorrowQuantity = Number(BookQuantity.value);
        let totalBorrowBooks = 0;
        book.forEach(books => {
            if (books.bookID == BorrowBookID) {
                user.forEach(users => {
                    if (users.userID == currentLoggedUserID) {
                        borrow.forEach(borrows => {
                            if (currentLoggedUserID == borrows.userID && borrows.status == "Borrowed") {
                                totalBorrowBooks += borrows.borrowBookCount;
                            }
                        });
                        if (totalBorrowBooks < 3 && BorrowQuantity <= books.bookCount && ((totalBorrowBooks + BorrowQuantity) <= 3)) {
                            books.bookCount -= BorrowQuantity;
                            const NewOrder = {
                                borrowID: 0,
                                bookID: books.bookID,
                                userID: currentLoggedUserID,
                                borrowedDate: new Date(),
                                borrowBookCount: BorrowQuantity,
                                status: "Borrowed",
                                paidFineAmount: 0
                            };
                            addBorrow(NewOrder);
                            updateBook(books.bookID, books);
                            updateUser(users.userID, users);
                            totalBorrowBooks = 0;
                            alert("Book borrowed successfully");
                        }
                        else if (totalBorrowBooks == 3) {
                            alert("You have already 3 books. Return the borrowed books to proceed");
                        }
                        else {
                            alert("Invalid quantity. Available quantity: " + books.bookCount);
                        }
                    }
                });
            }
        });
    });
}
function BorrowedBookHistoryTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab");
        BorrowBookHistoryTab.style.display = "block";
        let ReturnBooksTab = document.getElementById("ReturnBooksTab");
        ReturnBooksTab.style.display = "none";
        let HomeTab = document.getElementById("HomeTab");
        HomeTab.style.display = "none";
        let BorrowBookTab = document.getElementById("BorrowBookTab");
        BorrowBookTab.style.display = "none";
        let BookDetailsTab = document.getElementById("BookDetailsTab");
        BookDetailsTab.style.display = "none";
        let WalletRechargeTab = document.getElementById("WalletRechargeTab");
        WalletRechargeTab.style.display = "none";
        let WalletBalanceTab = document.getElementById("WalletBalanceTab");
        WalletBalanceTab.style.display = "none";
        const borrow = yield fetchBorrow();
        const user = yield fetchUser();
        let BorrowHistoryTable = document.getElementById("BorrowHistoryTable");
        BorrowHistoryTable.innerHTML = `<tr>
        <th>Borrow ID</th>
        <th>Book ID</th>
        <th>User ID</th>
        <th>Borrowed Date</th>
        <th>Borrowed Book Count</th>
        <th>Status</th>
        <th>Fine Amount</th>
    </tr>`;
        borrow.forEach(borrows => {
            if (borrows.userID == currentLoggedUserID) {
                BorrowHistoryTable.innerHTML += `<tr><td>${borrows.borrowID}</td><td>${borrows.bookID}</td><td>${borrows.userID}</td><td>${borrows.borrowedDate}</td><td>${borrows.borrowBookCount}</td><td>${borrows.status}</td><td>${borrows.paidFineAmount}</td></tr>`;
            }
        });
    });
}
function ReturnBooksTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let ReturnBooksTab = document.getElementById("ReturnBooksTab");
        ReturnBooksTab.style.display = "block";
        let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab");
        BorrowBookHistoryTab.style.display = "none";
        let HomeTab = document.getElementById("HomeTab");
        HomeTab.style.display = "none";
        let BorrowBookTab = document.getElementById("BorrowBookTab");
        BorrowBookTab.style.display = "none";
        let BookDetailsTab = document.getElementById("BookDetailsTab");
        BookDetailsTab.style.display = "none";
        let WalletRechargeTab = document.getElementById("WalletRechargeTab");
        WalletRechargeTab.style.display = "none";
        let WalletBalanceTab = document.getElementById("WalletBalanceTab");
        WalletBalanceTab.style.display = "none";
        let ReturnBooksTable = document.getElementById("ReturnBooksTable");
        ReturnBooksTable.innerHTML = `<tr>
        <th>Borrow ID</th>
        <th>Book ID</th>
        <th>Borrowed Date</th>
        <th>Borrowed Book Count</th>
        <th>Status</th>
        <th>Action</th>
    </tr>`;
        const borrow = yield fetchBorrow();
        borrow.forEach(borrows => {
            if (borrows.userID == currentLoggedUserID && borrows.status == "Borrowed") {
                ReturnBooksTable.innerHTML += `<tr><td>${borrows.borrowID}</td><td>${borrows.bookID}</td><td>${borrows.borrowedDate}</td><td>${borrows.borrowBookCount}</td><td>${borrows.status}</td><td><button onclick = ReturnBorrow("${borrows.borrowID}")>Return</button></td></tr>`;
            }
        });
    });
}
function ReturnBorrow(ReturnBorrowID) {
    return __awaiter(this, void 0, void 0, function* () {
        const borrow = yield fetchBorrow();
        const book = yield fetchBook();
        const user = yield fetchUser();
        borrow.forEach(borrows => {
            if (borrows.userID == currentLoggedUserID && borrows.status == "Borrowed") {
                if (borrows.borrowID == ReturnBorrowID) {
                    if (addDays(borrows.borrowedDate) >= new Date()) {
                        book.forEach(books => {
                            if (books.bookID == borrows.bookID) {
                                books.bookCount += borrows.borrowBookCount;
                                borrows.status = "Returned";
                                updateBook(books.bookID, books);
                                updateBorrow(borrows.borrowID, borrows);
                                alert("Book Returned Successfully");
                                ReturnBooksTab();
                            }
                        });
                    }
                    else {
                        let date1 = addDays(borrows.borrowedDate);
                        let date2 = new Date();
                        let DifferenceInDate = date2.getTime() - date1.getTime();
                        let Days = Math.round(DifferenceInDate / (1000 * 60 * 60 * 24));
                        let Fine = Days * 1;
                        user.forEach(users => {
                            if (users.userID == currentLoggedUserID) {
                                if (users.walletBalance < Fine) {
                                    let pendingAmount = Fine - users.walletBalance;
                                    alert("Please recharge fine amount of " + pendingAmount + " to return the book");
                                    pendingAmount = 0;
                                }
                                else {
                                    book.forEach(books => {
                                        if (books.bookID == borrows.bookID) {
                                            books.bookCount += borrows.borrowBookCount;
                                            users.walletBalance -= Fine;
                                            borrows.status = "Returned";
                                            borrows.paidFineAmount += Fine;
                                            updateBook(books.bookID, books);
                                            updateBorrow(borrows.borrowID, borrows);
                                            updateUser(currentLoggedUserID, users);
                                            alert("Book Returned Successfully");
                                            ReturnBooksTab();
                                            Fine = 0;
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
        });
    });
}
function addDays(date) {
    let AddedDate = new Date(date);
    AddedDate.setDate(AddedDate.getDate() + 15);
    return AddedDate;
}
function WalletRechargeTab() {
    let WalletRechargeTab = document.getElementById("WalletRechargeTab");
    WalletRechargeTab.style.display = "block";
    let ReturnBooksTab = document.getElementById("ReturnBooksTab");
    ReturnBooksTab.style.display = "none";
    let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab");
    BorrowBookHistoryTab.style.display = "none";
    let HomeTab = document.getElementById("HomeTab");
    HomeTab.style.display = "none";
    let BorrowBookTab = document.getElementById("BorrowBookTab");
    BorrowBookTab.style.display = "none";
    let BookDetailsTab = document.getElementById("BookDetailsTab");
    BookDetailsTab.style.display = "none";
    let WalletBalanceTab = document.getElementById("WalletBalanceTab");
    WalletBalanceTab.style.display = "none";
}
function RechargeWallet() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield fetchUser();
        let RechargeAmount = document.getElementById("RechargeAmount");
        if (Number(RechargeAmount.value) > 0) {
            user.forEach(users => {
                if (users.userID == currentLoggedUserID) {
                    users.walletBalance += Number(RechargeAmount.value);
                    alert("Recharge Successful");
                    CancellingRecharge();
                    updateUser(currentLoggedUserID, users);
                }
            });
        }
        else {
            alert("Enter a valid amount");
        }
    });
}
function CancellingRecharge() {
    let RechargeAmount = document.getElementById("RechargeAmount");
    RechargeAmount.value = "";
}
function WalletBalanceTab() {
    return __awaiter(this, void 0, void 0, function* () {
        let WalletBalanceTab = document.getElementById("WalletBalanceTab");
        WalletBalanceTab.style.display = "block";
        let WalletRechargeTab = document.getElementById("WalletRechargeTab");
        WalletRechargeTab.style.display = "none";
        let ReturnBooksTab = document.getElementById("ReturnBooksTab");
        ReturnBooksTab.style.display = "none";
        let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab");
        BorrowBookHistoryTab.style.display = "none";
        let HomeTab = document.getElementById("HomeTab");
        HomeTab.style.display = "none";
        let BorrowBookTab = document.getElementById("BorrowBookTab");
        BorrowBookTab.style.display = "none";
        let BookDetailsTab = document.getElementById("BookDetailsTab");
        BookDetailsTab.style.display = "none";
        const user = yield fetchUser();
        let WalletBalanceArea = document.getElementById("WalletBalanceArea");
        user.forEach(users => {
            if (users.userID == currentLoggedUserID) {
                WalletBalanceArea.innerText = users.walletBalance.toString();
            }
        });
    });
}
