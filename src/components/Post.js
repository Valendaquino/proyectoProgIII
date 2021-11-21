import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, Image, TouchableOpacity, FlatList } from 'react-native'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'
import CommentForm from './CommentForm'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            liked: false,
            showLikeModal: false,
            showCommentModal: false,
            comment: ''
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
        if (likes.includes(auth.currentUser.email)) {
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
                    likes: this.props.postData.data.likes.length,
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
    showLikeModal() {
        this.setState({
            showLikeModal: true,
        })
    }
    hideLikeModal() {
        this.setState({
            showLikeModal: false,
        })
    }
    showCommentModal() {
        this.setState({
            showCommentModal: true,
        })
    }

    hideCommentModal() {
        this.setState({
            showCommentModal: false,
        })
    }
    guardarComentario(algo) {
        //console.log(algo)
        let oneComment = {
            createdAt: Date.now(),
            user: auth.currentUser.email,
            comment: algo,
        }
        db.collection('posts').doc(this.props.postData.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
            .then(() => {
                this.setState({
                    showModal: false,
                    comment: ''
                })
            }
            )

    }
    deletePost() {

        db.collection("posts")
     
          .doc(this.props.postData.id).delete()
          .then((post) => {
            console.log(post.id);
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
      }


    render() {
        return (
            <View style={styles.container}>
                {this.props.postData.data.user == auth.currentUser.email ? (
                    <TouchableOpacity onPress={(id)=>this.deletePost(this.props.postData.id)}>X</TouchableOpacity>
                ):
                    null
                }
                <Image
                    style={styles.photo}
                    source={{ uri: this.props.postData.data.photo }}
                />

                <TouchableOpacity style={styles.button} onPress={() => this.showLikeModal()}>
                    <Text style={styles.textButton}> Liked</Text>
                </TouchableOpacity>
                <View style={[this.state.showCommenntModal ? styles.modalOn : styles.modalOff]}>
                    {
                        !this.state.liked ?
                            <TouchableOpacity style={styles.button} onPress={() => this.likePost()}>
                                <Text style={styles.textButton}><Image style={styles.icon} source={{ uri: "https://img.icons8.com/small/16/000000/like.png" }} /> {this.state.likes}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.button} onPress={() => this.unlikePost()}>
                                <Text style={styles.textButton}><Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios-filled/16/000000/like--v1.png" }} /> {this.state.likes}</Text>
                            </TouchableOpacity>
                    }
                    {/* MODAL  */}
                    <TouchableOpacity style={styles.button} onPress={() => this.showCommentModal()}>
                        <Text style={styles.textButton}> <Image style={styles.icon} source={{ uri: "https://img.icons8.com/small/16/000000/topic--v1.png" }} /> {this.props.postData.data.comments.length}</Text>
                    </TouchableOpacity>
                </View>



                <Text style={styles.email}> {this.props.postData.data.user} </Text>

                <Text style={styles.containerinfo}> {this.props.postData.data.description} </Text>
                 {/* Modal likes */}
                 {this.state.showLikeModal ?
                    <Modal style={styles.modalContainer}
                        visible={this.state.showLikeModal}
                        animationType='fade'
                        transparent={false}
                    >
                        <TouchableOpacity onPress={() => this.hideLikeModal()}>
                            <Text style={styles.closeModal}>X</Text>
                        </TouchableOpacity>

                        <FlatList
                            data={this.props.postData.data.likes}
                            keyExtractor={like => like.user}
                            renderItem={({ item }) => (
                             
                                <View >
                                    <Text style={styles.email}>{item} </Text>
                                   
                                </View>
                            )}

                        />
                        

                    </Modal> :
                    <Text></Text>
                }
                {/* Modal comentarios */}
                {this.state.showCommentModal ?
                    <Modal style={styles.modalContainer}
                        visible={this.state.showCommentModal}
                        animationType='fade'
                        transparent={false}
                    >
                        <TouchableOpacity onPress={() => this.hideCommentModal()}>
                            <Text style={styles.closeModal}>X</Text>
                        </TouchableOpacity>

                        <FlatList
                            data={this.props.postData.data.comments}
                            keyExtractor={comment => comment.createdAt.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.comms}>
                                    <Text style={styles.email}>{item.user}: </Text>
                                    <Text>{item.comment}</Text>
                                </View>
                            )}

                        />
                        <CommentForm guardarComentario={(algo) => this.guardarComentario(algo)} />

                    </Modal> :
                    <Text></Text>
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginVertical: 15,
        shadowColor: "#ccc",
        height: "fit-content",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,
        marginTop: 10
        // color:'white'
    },
    email: {
        color: 'black',
        fontWeight: '800'
    },
    containerinfo: {
        color: 'black',
        padding: "10px"
    },
    photo: {
        flex: 1,
        width: "90%",
        height: 200,
        borderRadius: 4,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20,
    },
    button: {
        backgroundColor: "#71CCF7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        width: "fit-content",
        height: "fit-content",
        borderStyle: "solid",
        borderColor: "#71CCF7",

    },
    textButton: {
        color: "black",
    },

    modalContainer: {
        width: '100%',
        height: '100%',
        flex: 3,
        
        alignSelf: 'center',
        backgroundColor: "white",
        borderColor: '#000000',
        borderRadius: 6,
        padding: 10,
        backgroundColor: 'white'
    },
    closeModal: {
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#71CCF7',
        marginTop: 2,
        borderRadius: 4,
    },
    modalText: {
        color: 'white',
    },
    comments: {
        flexDirection: "column",
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: "1"
    },
    comms: {
        display: "flex",
        flexDirection: "row",

    },
    icon: {
        flex: 2,
        width: "15px",
        height: "15px",

    },
    modalOn: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginBottom: "-30px"
    },
    modalOff: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginBottom: "inherit"
    }

});

export default Post