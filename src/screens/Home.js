import React, {Component} from 'React'
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import Posteos from '../components/Posteos'
import { db} from "../firebase/config";


export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            posteos: [],    
            carga: true     
        }
    }
    componentDidMount(){
        console.log("asd");
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot( docs => {
            let posts=[];
            docs.forEach(doc => {
                console.log(doc)
                posts.push({
                    id: doc.id,
                    data: doc.data()
                }) 
            })
            
            console.log(posts);

            this.setState({
                posteos: posts,    
                carga: false   
            })
        })
    }
    render(){
        return(
            <View style={styles.container}>
                {   this.state.carga ?
                    <ActivityIndicator size='large' color='teal'/> :
                    <View>
                        <FlatList
                            data={this.state.posteos}
                            renderItem={ ({item})=><Posteos doc={item}/>}
                        />
                    </View>
                }  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        padding: '4%',
        backgroundColor: 'white'
    },
    content: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 40
      },
      box: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        marginBottom: 10
      } 
})