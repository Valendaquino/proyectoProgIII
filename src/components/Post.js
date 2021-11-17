import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal,Image, TouchableOpacity,FlatList } from 'react-native'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'
import CommentForm from './CommentForm'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            liked: false,
            showModal:false,
            comment:''
        }
    }

   componentDidMount() {
        this.recieveLikes();
    }

   recieveLikes() {
        let likes = this.props.postData.data.likes;
        console.log(likes);
        if (likes) {
            this.setState({
                likes: likes.length
            })
        }
        if(likes.includes(auth.currentUser.email)) {    
            this.setState({
                liked: true
            })
        }
    }

    likePost() {
        let post = db.collection("posts").doc(this.props.postData.id);

        post.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likes:this.props.postData.data.likes.length,
                // this.state.likes + 1, //traer de la base de datos.
                liked: true
            })
            console.log('likeado');
        })
        .catch((error) => {
            console.error("Error updating document: ", error); 
        });
    }

    unlikePost() {
        let post = db.collection("posts").doc(this.props.postData.id);

        post.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likes: this.props.postData.data.likes.length,
                liked: false
            })
            console.log('deslikeado');
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    showModal(){
        this.setState({
            showModal:true,
        })
    }

    hideModal(){
        this.setState({
            showModal:false,
        })
    }
    guardarComentario(algo){
        //console.log(algo)
        let oneComment = {
            createdAt: Date.now(),
            user: auth.currentUser.email,
            comment: algo, 
        }
         db.collection('posts').doc(this.props.postData.id).update({
           comments:firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(()=>{
            this.setState({
                showModal:false,
                comment:''
            })
        }
        )

    }
    




    render() {
        return (
            <View style={styles.container}>
                 <Image
                    style={{ flex: 1, width: "100%", height:200, borderRadius: 4, marginBottom:10 }}
                    source={{ uri: this.props.postData.data.photo}}
                    />
                <Text> {this.props.postData.data.user} </Text>
                <Text> {this.props.postData.data.description} </Text>
=
                <TouchableOpacity onPress={() => this.showModal()}>
                    <Text>Likes: {this.state.likes}</Text>
                </TouchableOpacity>
                {
                    ! this.state.liked ?
                        <TouchableOpacity style={styles.button} onPress={() => this.likePost()}>
                            <Text style={styles.textButton}>Likear</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity style={styles.button} onPress={() => this.unlikePost()}>
                            <Text style={styles.textButton}>Deslikear</Text>
                        </TouchableOpacity>
                }
                {/* MODAL  */}

                <TouchableOpacity onPress={() => this.showModal()}>
                    <Text>Comments: {this.props.postData.data.comments.length}</Text>
                </TouchableOpacity>

                {/* Modal comentarios */}
            {   this.state.showModal ?
                <Modal style={styles.modalContainer}
                    visible={this.state.showModal}
                    animationType='slide'
                    transparent={false}
                >   
                    <TouchableOpacity onPress={()=>this.hideModal()}>
                        <Text style={styles.closeModal}>X</Text>
                    </TouchableOpacity> 

                    <FlatList
                        data={this.props.postData.data.comments}
                        keyExtractor={comment=>comment.createdAt.toString()}
                        renderItem={({item})=>(
                                <Text>{item.user}: {item.comment}</Text> 
                        )}

                    />
                    <CommentForm guardarComentario={(algo)=> this.guardarComentario(algo)} />

                </Modal>    :
                <Text></Text>
            } 


            </View>
        )
    }

}
           
const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#71CCF7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#71CCF7",
    },
    textButton: {
        color: "#fff",
    },
    modalContainer: {
        width:'100%',  
        flex: 3,
        alignSelf: 'center',
        backgroundColor: "white",
        borderColor: '#000000',
        borderRadius: 6,
        padding: 10,
        backgroundColor: 'white'
    },
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#71CCF7',
        marginTop:2,
        borderRadius: 4,
    },
    modalText:{
        fontWeight: 'bold',
        color:'white',
    },

});

export default Post