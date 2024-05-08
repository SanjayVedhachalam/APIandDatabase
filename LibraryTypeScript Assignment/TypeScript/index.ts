let currentLoggedUserID: number;
interface User {
    userID : number
    userName: string
    userEmail: string
    userPassword: string
    userConfirmPassword: string
    gender: string
    department: string
    mobileNumber: string
    walletBalance: number
}

interface Book {
    bookID: number
    bookName: string
    authorName: string
    bookCount: number
}

interface Borrow {
    borrowID: number
    bookID: number
    userID: number
    borrowedDate: Date
    borrowBookCount: number
    status: string
    paidFineAmount: number
}

async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5119/api/userdetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch user details');
        }
        return await response.json();
}

async function fetchBook(): Promise<Book[]> {
    const apiUrl = 'http://localhost:5119/api/bookdetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch book details')
        }
        return await response.json();
}

async function fetchBorrow(): Promise<Borrow[]> {
    const apiUrl = 'http://localhost:5119/api/borrowdetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error('Failed to fetch borrow details');
        }
        return await response.json();
}

async function addUser(user: User): Promise<void> {
    const response = await fetch('http://localhost:5119/api/userdetails',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
        {
            throw new Error('Failed to add User')
        }
}

async function addBook(book: Book): Promise<void> {
    const response = await fetch('http://localhost:5119/api/bookdetails',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    if(!response.ok)
        {
            throw new Error('Failed to add book')
        }
}

async function addBorrow(borrow: Borrow): Promise<void> {
    const response = await fetch('http://localhost:5119/api/borrowdetails',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(borrow)
    });
    if(!response.ok)
        {
            throw new Error('Failed to add borrow')
        }    
}

async function updateUser(id: number, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5119/api/userdetails/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
        {
            throw new Error('Failed to update user')
        }
}

async function updateBook(id: number, book: Book): Promise<void> {
    const response = await fetch(`http://localhost:5119/api/bookdetails/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    if(!response.ok)
        {
            throw new Error('Failed to update book')
        }
}

async function updateBorrow(id: number, borrow: Borrow): Promise<void> {
    const response = await fetch(`http://localhost:5119/api/borrowdetails/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(borrow)
    });
    if(!response.ok)
        {
            throw new Error('Failed to update borrow');
        }
}

async function deleteBook(id: number, book: Book): Promise<void> {
    const response = await fetch(`http://localhost:5119/api/bookdetails/${id}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(book)
    });
    if(!response.ok)
        {
            throw new Error('Failed to delete book')
        }
}
function SignIn()
{
    let SignIn = document.getElementById("SignIn") as HTMLDivElement;
    SignIn.style.display = "block";

    let SignUp = document.getElementById("SignUp") as HTMLDivElement;
    SignUp.style.display = "none";
}

async function Enter(){
    let SignInEmailID = document.getElementById("SignInEmailID") as HTMLInputElement
    let SignInPassword = document.getElementById("SignInPassword") as HTMLInputElement

    const user = await fetchUser();
    user.forEach(users =>{
        if(users.userEmail == SignInEmailID.value)
            {
                if(users.userPassword == SignInPassword.value)
                    {
                        currentLoggedUserID = users.userID;
                        alert("Login Successful");
                        (document.getElementById("Main") as HTMLDivElement).style.display = "none";
                        (document.getElementById("BodyPage") as HTMLDivElement).style.display = "block";
                        HomeTab()
                        SignInCancel()
                    }
                else
                    {
                        alert("Invalid Password")    
                    }
            }
    })
}

function SignInCancel(){
    let SignInEmailID = document.getElementById("SignInEmailID") as HTMLInputElement
    let SignInPassword = document.getElementById("SignInPassword") as HTMLInputElement

    SignInEmailID.value = "";
    SignInPassword.value = "";
}
function SignUp()
{
    let SignUp = document.getElementById("SignUp") as HTMLDivElement;
    SignUp.style.display = "block";

    let SignIn = document.getElementById("SignIn") as HTMLDivElement;
    SignIn.style.display = "none";
}

async function Confirm() {
    let SignUpName = document.getElementById("SignUpName") as HTMLInputElement;
    let SignUpEmailID = document.getElementById("SignUpEmailID") as HTMLInputElement;
    let SignUpPassword = document.getElementById("SignUpPassword") as HTMLInputElement;
    let SignUpConfirmPassword = document.getElementById("SignUpConfirmPassword") as HTMLInputElement;
    let SignUpGender = document.getElementById("SignUpGender") as HTMLSelectElement;
    let GenderMale = document.getElementById("GenderMale") as HTMLOptionElement
    let GenderFemale = document.getElementById("GenderFemale") as HTMLOptionElement
    let GenderOthers = document.getElementById("GenderOthers") as HTMLOptionElement
    let SignUpDepartment = document.getElementById("SignUpDepartment") as HTMLInputElement;
    let SignUpPhone = document.getElementById("SignUpPhone") as HTMLInputElement;
    let SignUpWalletBalance = document.getElementById("SignUpWalletBalance") as HTMLInputElement;
    let SelectedGender = "";
    let flag: boolean = true;
    if(GenderMale.selected)
        {
            SelectedGender = GenderMale.value;
        }
    else if(GenderFemale.selected)
        {
            SelectedGender = GenderFemale.value;
        }
    else if(GenderOthers.selected)
        {
            SelectedGender = GenderOthers.value;
        }
    else
    {
        alert("Please select a gender")
        flag = false;
        //SignUpGender.style.border = "red 0.1rem solid";
    }
    if(flag == true){
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
        }
    
        addUser(NewUser);
        alert("Registration Successful")
        SignUpCancel();
    }
}

function SignUpCancel(){
    let SignUpName = document.getElementById("SignUpName") as HTMLInputElement;
    let SignUpEmailID = document.getElementById("SignUpEmailID") as HTMLInputElement;
    let SignUpPassword = document.getElementById("SignUpPassword") as HTMLInputElement;
    let SignUpConfirmPassword = document.getElementById("SignUpConfirmPassword") as HTMLInputElement;
    let SignUpGender = document.getElementById("SignUpGender") as HTMLSelectElement;
    let Select = document.getElementById("Select") as HTMLOptionElement;
    let SignUpDepartment = document.getElementById("SignUpDepartment") as HTMLInputElement;
    let SignUpPhone = document.getElementById("SignUpPhone") as HTMLInputElement;
    let SignUpWalletBalance = document.getElementById("SignUpWalletBalance") as HTMLInputElement;

    SignUpName.value = "";
    SignUpEmailID.value = "";
    SignUpPassword.value = "";
    SignUpConfirmPassword.value = "";
    SignUpDepartment.value = "";
    SignUpPhone.value = "";
    SignUpWalletBalance.value = "";

}

async function HomeTab(){
    let HomeTab = document.getElementById("HomeTab") as HTMLDivElement
    HomeTab.style.display = "block";

    let ReturnBooksTab = document.getElementById("ReturnBooksTab") as HTMLDivElement
    ReturnBooksTab.style.display = "none"

    let BorrowBookTab = document.getElementById("BorrowBookTab") as HTMLDivElement
    BorrowBookTab.style.display = "none"
    
    let BookDetailsTab = document.getElementById("BookDetailsTab") as HTMLDivElement
    BookDetailsTab.style.display = "none";

    let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab") as HTMLDivElement
    BorrowBookHistoryTab.style.display = "none";
    
    let WalletRechargeTab = document.getElementById("WalletRechargeTab") as HTMLDivElement
    WalletRechargeTab.style.display = "none"
    
    let WalletBalanceTab = document.getElementById("WalletBalanceTab") as HTMLDivElement
    WalletBalanceTab.style.display = "none"


    let WelcomeName = document.getElementById("WelcomeName") as HTMLSpanElement
    const user = await fetchUser();
    user.forEach(users =>{
        if(users.userID == currentLoggedUserID)
            {
                WelcomeName.innerText = users.userName;
            }
    })
}

async function SignoutTab() {
    (document.getElementById("BodyPage") as HTMLDivElement).style.display = "none";
    (document.getElementById("Main") as HTMLDivElement).style.display = "block";

}

async function BookDetailsTab() {
    let BookDetailsTab = document.getElementById("BookDetailsTab") as HTMLDivElement
    BookDetailsTab.style.display = "block";

    let ReturnBooksTab = document.getElementById("ReturnBooksTab") as HTMLDivElement
    ReturnBooksTab.style.display = "none"

    let BorrowBookTab = document.getElementById("BorrowBookTab") as HTMLDivElement
    BorrowBookTab.style.display = "none"

    let HomeTab = document.getElementById("HomeTab") as HTMLDivElement
    HomeTab.style.display = "none";

    let NewBookDetailsTab = document.getElementById("NewBookDetailsTab") as HTMLDivElement
    NewBookDetailsTab.style.display = "none";

    let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab") as HTMLDivElement
    BorrowBookHistoryTab.style.display = "none";
    
    let WalletRechargeTab = document.getElementById("WalletRechargeTab") as HTMLDivElement
    WalletRechargeTab.style.display = "none"
    
    let WalletBalanceTab = document.getElementById("WalletBalanceTab") as HTMLDivElement
    WalletBalanceTab.style.display = "none"

    

    let BookTable = document.getElementById("BookTable") as HTMLTableElement

    BookTable.innerHTML = `<tr>
        <th>Book ID</th>
        <th>Book Name</th>
        <th>Author Name</th>
        <th>Book Count</th>
        <th>Action</th>
    </tr>`

    const book = await fetchBook();
    book.forEach(books =>{
        BookTable.innerHTML += `<tr><td>${books.bookID}</td><td>${books.bookName}</td><td>${books.authorName}</td><td>${books.bookCount}</td><td><button onclick = EditBook("${books.bookID}")>Edit</button><button onclick = DeleteBook("${books.bookID}")>Delete</button></td></tr>`
    })
}

function AddNewBook(){
    let NewBookDetailsTab = document.getElementById("NewBookDetailsTab") as HTMLDivElement
    NewBookDetailsTab.style.display = "block";
}

function AddNewBookToList(){
    let NewBookName = document.getElementById("NewBookName") as HTMLInputElement;
    let NewAuthorName = document.getElementById("NewAuthorName") as HTMLInputElement;
    let NewBookCount = document.getElementById("NewBookCount") as HTMLInputElement;

    if(NewBookName.value != "" && NewBookCount.value != "" && NewAuthorName.value != ""){
        const NewBook = {
            bookID: 0,
            bookName: NewBookName.value,
            authorName: NewAuthorName.value,
            bookCount: Number(NewBookCount.value)
        }
        addBook(NewBook)
        alert("Book Added Successfully")
        CancelNewBook()
        BookDetailsTab()
        let NewBookDetailsTab = document.getElementById("NewBookDetailsTab") as HTMLDivElement
        NewBookDetailsTab.style.display = "none";
    }
    else{
        alert("Invalid Book Details")
    }
}

function CancelNewBook(){
    let NewBookName = document.getElementById("NewBookName") as HTMLInputElement;
    let NewAuthorName = document.getElementById("NewAuthorName") as HTMLInputElement;
    let NewBookCount = document.getElementById("NewBookCount") as HTMLInputElement;

    NewBookName.value = ""
    NewAuthorName.value = ""
    NewBookCount.value = ""
}

async function DeleteBook(DeleteBookID: number){
    const book = await fetchBook();
    book.forEach(books =>{
        if(books.bookID == DeleteBookID){
            deleteBook(books.bookID, books);
            updateBook(books.bookID, books);
            alert(books.bookName+" Book Deleted Successfully")
            BookDetailsTab();
        }
    })
}

async function BorrowBookTab(){
    let BorrowBookTab = document.getElementById("BorrowBookTab") as HTMLDivElement
    BorrowBookTab.style.display = "block"
    
    let ReturnBooksTab = document.getElementById("ReturnBooksTab") as HTMLDivElement
    ReturnBooksTab.style.display = "none"

    let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab") as HTMLDivElement
    BorrowBookHistoryTab.style.display = "none";

    let BookDetailsTab = document.getElementById("BookDetailsTab") as HTMLDivElement
    BookDetailsTab.style.display = "none";

    let HomeTab = document.getElementById("HomeTab") as HTMLDivElement
    HomeTab.style.display = "none";
    
    let WalletRechargeTab = document.getElementById("WalletRechargeTab") as HTMLDivElement
    WalletRechargeTab.style.display = "none"
    
    let WalletBalanceTab = document.getElementById("WalletBalanceTab") as HTMLDivElement
    WalletBalanceTab.style.display = "none"

    

    let BorrowTable = document.getElementById("BorrowTable") as HTMLTableElement

    BorrowTable.innerHTML = `<tr>
        <th>Book ID</th>
        <th>Book Name</th>
        <th>Author Name</th>
        <th>Book Count</th>
        <th>Action</th>
    </tr>`

    const book = await fetchBook();
    book.forEach(books =>{
        BorrowTable.innerHTML += `<tr><td>${books.bookID}</td><td>${books.bookName}</td><td>${books.authorName}</td><td>${books.bookCount}</td><td><button onclick = BorrowBook("${books.bookID}")>Borrow</button></td></tr>`
    })
}

async function BorrowBook(BorrowBookID: number) {
    const book = await fetchBook();
    const borrow = await fetchBorrow();
    const user = await fetchUser();

    let BookQuantity = document.getElementById("BookQuantity") as HTMLInputElement;
    let BorrowQuantity = Number(BookQuantity.value);
    let totalBorrowBooks: number = 0;
    book.forEach(books =>{
        if(books.bookID == BorrowBookID)
            {
            user.forEach(users => {
                if (users.userID == currentLoggedUserID) {
                    borrow.forEach(borrows => {
                        if (currentLoggedUserID == borrows.userID && borrows.status == "Borrowed") {
                            totalBorrowBooks += borrows.borrowBookCount;
                        }
                    })
                    if (totalBorrowBooks < 3 && BorrowQuantity <= books.bookCount && ((totalBorrowBooks+BorrowQuantity)<=3)) {
                        books.bookCount -= BorrowQuantity;
                        const NewOrder = {
                            borrowID: 0,
                            bookID: books.bookID,
                            userID: currentLoggedUserID,
                            borrowedDate: new Date(),
                            borrowBookCount: BorrowQuantity,
                            status: "Borrowed",
                            paidFineAmount: 0
                        }
                        addBorrow(NewOrder)
                        updateBook(books.bookID, books)
                        updateUser(users.userID, users)
                        totalBorrowBooks = 0;
                        alert("Book borrowed successfully")
                    }
                    else if(totalBorrowBooks == 3){
                        alert("You have already 3 books. Return the borrowed books to proceed")
                    }
                    else{
                        alert("Invalid quantity. Available quantity: "+books.bookCount)
                    }
                }
            })
            }
    })
}

async function BorrowedBookHistoryTab(){
    let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab") as HTMLDivElement
    BorrowBookHistoryTab.style.display = "block";

    let ReturnBooksTab = document.getElementById("ReturnBooksTab") as HTMLDivElement
    ReturnBooksTab.style.display = "none"

    let HomeTab = document.getElementById("HomeTab") as HTMLDivElement
    HomeTab.style.display = "none";

    let BorrowBookTab = document.getElementById("BorrowBookTab") as HTMLDivElement
    BorrowBookTab.style.display = "none"
    
    let BookDetailsTab = document.getElementById("BookDetailsTab") as HTMLDivElement
    BookDetailsTab.style.display = "none";
    
    let WalletRechargeTab = document.getElementById("WalletRechargeTab") as HTMLDivElement
    WalletRechargeTab.style.display = "none"
    
    let WalletBalanceTab = document.getElementById("WalletBalanceTab") as HTMLDivElement
    WalletBalanceTab.style.display = "none"



    const borrow = await fetchBorrow();
    const user = await fetchUser();

    let BorrowHistoryTable = document.getElementById("BorrowHistoryTable") as HTMLTableElement

    BorrowHistoryTable.innerHTML = `<tr>
        <th>Borrow ID</th>
        <th>Book ID</th>
        <th>User ID</th>
        <th>Borrowed Date</th>
        <th>Borrowed Book Count</th>
        <th>Status</th>
        <th>Fine Amount</th>
    </tr>`


    borrow.forEach(borrows => {
        if (borrows.userID == currentLoggedUserID) {
            BorrowHistoryTable.innerHTML += `<tr><td>${borrows.borrowID}</td><td>${borrows.bookID}</td><td>${borrows.userID}</td><td>${borrows.borrowedDate}</td><td>${borrows.borrowBookCount}</td><td>${borrows.status}</td><td>${borrows.paidFineAmount}</td></tr>`
        }
    })


}

async function ReturnBooksTab() {
    let ReturnBooksTab = document.getElementById("ReturnBooksTab") as HTMLDivElement
    ReturnBooksTab.style.display = "block"

    let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab") as HTMLDivElement
    BorrowBookHistoryTab.style.display = "none";

    let HomeTab = document.getElementById("HomeTab") as HTMLDivElement
    HomeTab.style.display = "none";

    let BorrowBookTab = document.getElementById("BorrowBookTab") as HTMLDivElement
    BorrowBookTab.style.display = "none"
    
    let BookDetailsTab = document.getElementById("BookDetailsTab") as HTMLDivElement
    BookDetailsTab.style.display = "none";

    let WalletRechargeTab = document.getElementById("WalletRechargeTab") as HTMLDivElement
    WalletRechargeTab.style.display = "none"
    
    let WalletBalanceTab = document.getElementById("WalletBalanceTab") as HTMLDivElement
    WalletBalanceTab.style.display = "none"


    
    let ReturnBooksTable = document.getElementById("ReturnBooksTable") as HTMLTableElement;
    ReturnBooksTable.innerHTML = `<tr>
        <th>Borrow ID</th>
        <th>Book ID</th>
        <th>Borrowed Date</th>
        <th>Borrowed Book Count</th>
        <th>Status</th>
        <th>Action</th>
    </tr>`

    const borrow = await fetchBorrow();

    borrow.forEach(borrows => {
        if (borrows.userID == currentLoggedUserID && borrows.status == "Borrowed") {
            ReturnBooksTable.innerHTML += `<tr><td>${borrows.borrowID}</td><td>${borrows.bookID}</td><td>${borrows.borrowedDate}</td><td>${borrows.borrowBookCount}</td><td>${borrows.status}</td><td><button onclick = ReturnBorrow("${borrows.borrowID}")>Return</button></td></tr>`
        }
    })
}

async function ReturnBorrow(ReturnBorrowID: number) {
    const borrow = await fetchBorrow();
    const book = await fetchBook();
    const user = await fetchUser();

    borrow.forEach(borrows =>{
        if (borrows.userID == currentLoggedUserID && borrows.status == "Borrowed") {
            if(borrows.borrowID == ReturnBorrowID){
                if(addDays(borrows.borrowedDate)>=new Date()){
                    book.forEach(books =>{
                        if(books.bookID == borrows.bookID){
                            books.bookCount+=borrows.borrowBookCount;
                            borrows.status = "Returned";
                            updateBook(books.bookID,books)
                            updateBorrow(borrows.borrowID, borrows)
                            alert("Book Returned Successfully")
                            ReturnBooksTab()
                        }
                    })
                }
                else{
                    let date1 = addDays(borrows.borrowedDate)
                    let date2 = new Date()
                    let DifferenceInDate = date2.getTime() - date1.getTime();
                    let Days = Math.round(DifferenceInDate / (1000*60*60*24))

                    let Fine = Days*1;
                    user.forEach(users =>{
                        if(users.userID == currentLoggedUserID){
                            if(users.walletBalance < Fine){
                                let pendingAmount = Fine - users.walletBalance
                                alert("Please recharge fine amount of "+pendingAmount+" to return the book")
                                pendingAmount = 0;
                            }
                            else{
                                book.forEach(books =>{
                                    if(books.bookID == borrows.bookID){
                                        books.bookCount+=borrows.borrowBookCount;
                                        users.walletBalance-=Fine;
                                        borrows.status = "Returned";
                                        borrows.paidFineAmount+=Fine;
                                        updateBook(books.bookID,books)
                                        updateBorrow(borrows.borrowID, borrows)
                                        updateUser(currentLoggedUserID,users)
                                        alert("Book Returned Successfully")
                                        ReturnBooksTab()
                                        Fine = 0;
                                    }
                                })
                            }
                        }
                    })

                }
            }
        }
    })
}

function addDays(date: Date): Date {
    let AddedDate = new Date(date)
    AddedDate.setDate(AddedDate.getDate() + 15);
    return AddedDate;
}

function WalletRechargeTab(){
    let WalletRechargeTab = document.getElementById("WalletRechargeTab") as HTMLDivElement
    WalletRechargeTab.style.display = "block"

    let ReturnBooksTab = document.getElementById("ReturnBooksTab") as HTMLDivElement
    ReturnBooksTab.style.display = "none"

    let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab") as HTMLDivElement
    BorrowBookHistoryTab.style.display = "none";

    let HomeTab = document.getElementById("HomeTab") as HTMLDivElement
    HomeTab.style.display = "none";

    let BorrowBookTab = document.getElementById("BorrowBookTab") as HTMLDivElement
    BorrowBookTab.style.display = "none"
    
    let BookDetailsTab = document.getElementById("BookDetailsTab") as HTMLDivElement
    BookDetailsTab.style.display = "none";
    
    let WalletBalanceTab = document.getElementById("WalletBalanceTab") as HTMLDivElement
    WalletBalanceTab.style.display = "none"

}
async function RechargeWallet(){

    const user = await fetchUser();

    let RechargeAmount = document.getElementById("RechargeAmount") as HTMLInputElement
    if(Number(RechargeAmount.value) > 0){
        user.forEach(users =>{
            if(users.userID == currentLoggedUserID){
                users.walletBalance+=Number(RechargeAmount.value);
                alert("Recharge Successful")
                CancellingRecharge();
                updateUser(currentLoggedUserID,users);
            }
        })
    }
    else{
        alert("Enter a valid amount");
    }
}

function CancellingRecharge(){
    let RechargeAmount = document.getElementById("RechargeAmount") as HTMLInputElement
    RechargeAmount.value = "";
}

async function WalletBalanceTab(){
    let WalletBalanceTab = document.getElementById("WalletBalanceTab") as HTMLDivElement
    WalletBalanceTab.style.display = "block"

    let WalletRechargeTab = document.getElementById("WalletRechargeTab") as HTMLDivElement
    WalletRechargeTab.style.display = "none"

    let ReturnBooksTab = document.getElementById("ReturnBooksTab") as HTMLDivElement
    ReturnBooksTab.style.display = "none"

    let BorrowBookHistoryTab = document.getElementById("BorrowBookHistoryTab") as HTMLDivElement
    BorrowBookHistoryTab.style.display = "none";

    let HomeTab = document.getElementById("HomeTab") as HTMLDivElement
    HomeTab.style.display = "none";

    let BorrowBookTab = document.getElementById("BorrowBookTab") as HTMLDivElement
    BorrowBookTab.style.display = "none"
    
    let BookDetailsTab = document.getElementById("BookDetailsTab") as HTMLDivElement
    BookDetailsTab.style.display = "none";

    const user = await fetchUser()

    let WalletBalanceArea = document.getElementById("WalletBalanceArea") as HTMLSpanElement

    user.forEach(users =>{
        if(users.userID == currentLoggedUserID){
            WalletBalanceArea.innerText = users.walletBalance.toString();
        }
    })
}