import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default class Lista extends Component {

    constructor(props){
        super(props);
        this.state = {
            feed: this.props.data
        };

        this.mostrarLikes = this.mostrarLikes.bind(this);
        this.isLkeada = this.isLkeada.bind(this);
        this.like = this.like.bind(this);
    }

    mostrarLikes(qtdLikes){
        if(qtdLikes <= 0) {
            return;
        } else {
            return (
                <Text style={styles.likers}>
                    {qtdLikes} {qtdLikes > 1 ? 'curtidas': 'curtida'}
                </Text>
            );
        }
    }

    isLkeada(likeada) {
        return likeada ? require('../img/likeada.png') : require('../img/like.png');
    }

    like(){
        //descontruindo objeto para facilitar manuseio
        let feed = this.state.feed;

        if (feed.likeada) {
            this.setState({
                feed:{
                    ...feed, //Pega tudo do obj feed e MAIS as duas propriedade posteriores
                    likeada: false,
                    likers: --feed.likers,
                }
            });
        } else {
            this.setState({
                feed:{
                    ...feed,
                    likeada: true,
                    likers: ++feed.likers,
                }
            });
        }
    }

    render(){
        return (
            <View style={styles.areaFeed}>
                <View style={styles.viewPefil}>
                    <Image 
                        source={{uri:this.state.feed.imgperfil}}
                        style={styles.fotoPerfil}
                    />
                    <Text style={styles.nomeusuario}>{ this.state.feed.nome }</Text>
                </View>
                <Image 
                    resizeMode='cover'
                    style={styles.fotoPublicacao}
                    source={{uri: this.state.feed.imgPublicacao}}
                />
                <View style={styles.areaBtn}>
                    <TouchableOpacity onPress={this.like} >
                        <Image
                            source={this.isLkeada(this.state.feed.likeada)}
                            style={styles.iconelike}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSend}>
                        <Image 
                            source={require('../img/send.png')}
                            style={styles.iconelike}
                        />
                    </TouchableOpacity>
                </View>
                {  this.mostrarLikes(this.state.feed.likers) }
                <View style={styles.viewRodape}>
                    <Text style={styles.nomeRodape}>
                        {this.state.feed.nome}
                    </Text>
                    <Text style={styles.descRodape}>
                        {this.state.feed.descricao}
                    </Text>
                </View>
            </View>// end view
        );
    }
}

const styles = StyleSheet.create({
    areaFeed:{

    },
    nomeusuario:{
        fontSize: 22,
        textAlign: 'left',
        color: '#000'
    },
    fotoPerfil:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    viewPefil:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: 8

    },
    fotoPublicacao:{
        flex: 1,
        height: 400,
        alignItems: 'center',
    },
    areaBtn:{
        flexDirection: 'row',
        padding: 5,
    },
    iconelike:{
        width: 30,
        height: 30,
    },
    btnSend:{
        paddingLeft: 5
    },
    viewRodape:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    descRodape:{
        paddingLeft: 5,
        fontSize:15,
        color: '#000'
    },
    nomeRodape:{
        fontSize:15,
        fontWeight:'bold',
        paddingLeft: 5
    },
    likers:{
        paddingLeft: 5,
        fontWeight: 'bold'
    }
});