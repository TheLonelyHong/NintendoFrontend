import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { Timestamp } from 'firebase/firestore';

export const showMsg = (msg , error) => {
            switch(error){
                    case 'SUCCESS':
                            toast.success(msg , {
                                position:"bottom-right",
                                autoClose:2500
                            })
                            break;
                    case 'ERROR':
                            toast.error(msg , {
                                position:"bottom-right",
                                autoClose:2500
                            });
                            break;
                    default:
                        return false;
            }
}

export class UserOrder{
                constructor(items , email , userUid , total){
                        this.items = items;
                        this.email = email;
                        this.userUid = userUid;
                        this.total = total;
                }
                toString(){
                        return this.items + ", " + this.email + ", " + this.userUid + ", " + this.total;
                }
}

export const userOrderConverter = {
                toFirestore: (user) => {
                        return {
                                items:[...user.items],
                                email:user.email,
                                userUid:user.userUid,
                                createdAt:Timestamp.fromDate(new Date()),
                                total:user.total,
                                status:"pending"
                        };
                },
                fromFirestore: (snapshot, options) => {
                        const data = snapshot.data(options);
                        return new UserOrder(data.items , data.email , data.userUid , data.total);
                }
}

export class User{
        constructor(username , email, userUid){
                this.username = username;
                this.email = email;
                this.userUid = userUid;
        }
        toString(){
                return this.username + ", " + this.email + ", " + this.userUid;
        }
}

export const userConverter = {
        toFirestore: (user) => {
            return {
                    username:user.username,
                    userUid:user.userUid,
                    email:user.email,
                    profileImg:"",
                    profileImgUrl:"",
                    wishlist:[],
                    order:[],
                    sentItem:[],
                    role:"user"
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new User(data.username , data.email , data.userUid);
        }
};

export class Product{
                constructor(category , title , description , price , stock , image , imageURL ){
                        this.category = category;
                        this.title = title;
                        this.description = description;
                        this.price = price;
                        this.stock = stock;
                        this.image = image;
                        this.imageURL = imageURL;
                }
                toString(){
                        return this.category + ", " + this.title + ", " + this.description + ", " + this.price + ", " + this.stock + ", " + this.image + ", " + this.imageURL;
                }
}

export const productConverter = {
                toFirestore:(product) => {
                                return {
                                        category:product.category,
                                        title:product.title,
                                        description:product.description,
                                        price:product.price,
                                        stock:product.stock,
                                        image:[...product.image],
                                        imageURL:[...product.imageURL],
                                        comments:[],
                                        rating:[]
                                }
                },
                fromFirestore:(snapshot , options) => {
                        const data = snapshot.data(options);
                        return new Product(data.category , data.title , data.description , data.price , data.stock , data.image , data.imageURL);
                }
}

export class ProductColour{
        constructor(category , title , color , description , price , stock , image , imageURL ){
                this.category = category;
                this.title = title;
                this.description = description;
                this.price = price;
                this.stock = stock;
                this.image = image;
                this.imageURL = imageURL;
                this.color = color;
        }
        toString(){
                return this.category + ", " + this.title + ", " + this.description + ", " + this.price + ", " + this.stock + ", " + this.image + ", " + this.imageURL + ", " + this.color;
        }
}

export const productColourConverter = {
        toFirestore:(product) => {
                        return {
                                category:product.category,
                                title:product.title,
                                description:product.description,
                                price:product.price,
                                stock:product.stock,
                                image:[...product.image],
                                imageURL:[...product.imageURL],
                                color:product.color,
                                comments:[],
                                rating:[]
                        }
        },
        fromFirestore:(snapshot , options) => {
                const data = snapshot.data(options);
                return new Product(data.category , data.title , data.color , data.description , data.price , data.stock , data.image , data.imageURL);
        }
}


export const Loader = () => (
        <div className='w-100 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                    </Spinner>
        </div>
)

export const convertTimestamp = (seconds , nanoseconds) => {
        const timestamp = new Timestamp(seconds , nanoseconds);
        const month = timestamp.toDate().getMonth();
        let day = timestamp.toDate().getDate();
        const year = timestamp.toDate().getFullYear();
        let hour = timestamp.toDate().getHours();
        let minutes = timestamp.toDate().getMinutes();

        const months = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "July" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"];
        day = day < 10 ? `0${day}`: day;
        hour = hour < 10 ? `0${hour}` : hour;
        minutes = minutes < 10 ? `0${minutes}`:minutes;

        return `${day}/${months[month]}/${year} ${hour}:${minutes}`;
};