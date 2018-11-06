import React from 'react';
import {View, Text, Pla, TouchableOpacity} from 'react-native';
import ImagePicker from "react-native-image-picker";
import {GiftedChat} from "react-native-gifted-chat-video-support";

const uuidv4 = require('uuid/v4');

export default class App extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            item:undefined,
            image:'',
            video:'',
            messages: []
        }
    }

    chooseImage() {
        const options = {
            title: null,
            takePhotoButtonTitle: "Take photo",
            chooseFromLibraryButtonTitle: "Choose from library",
            cancelButtonTitle: "cancel",
            cameraType: 'front',
            mediaType: 'photo',
            aspectX: 1,
            aspectY: 1,
            quality: 1.0,
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                if (response.customButton === 'remove') {
                    console.log('User tapped custom button: ', response.customButton);
                    this.setState({ Images: undefined });
                }
            } else {
                const source = { uri: response.uri };
                let msg = {

                    _id: uuidv4(),
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: "test",
                    },
                    image: source.uri,
                }
                this.onSend(msg)
            }
        });
    }

    chooseVideo() {
        console.log("choose vids called ");
        const options = {
            title: null,
            takePhotoButtonTitle: "Take video",
            chooseFromLibraryButtonTitle: "choose video",
            cancelButtonTitle: "cancel",
            cameraType: 'front',
            mediaType: 'video',
            videoQuality:'medium',
            aspectX: 1,
            aspectY: 1,
            allowsEditing: true,
            quality: 1.0,
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled video picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                if (response.customButton === 'remove') {
                    console.log('User tapped custom button: ', response.customButton);
                    this.setState({ Vids: undefined });
                }
            } else {
                const source = { uri: response.uri };
                let msg = {
                    _id: uuidv4(),
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: "test",
                    },
                    video: source.uri,
                }
                this.onSend(msg)
            }
        });
    }

    renderLeftIcon = () =>{
        return(
            <View  style={{ height:'100%',alignItems:'center'  , justifyContent:'flex-start' , flexDirection:'row' , paddingLeft:5,paddingRight: 5}}>

                <TouchableOpacity onPress={this.chooseVideo.bind(this)} >
                    <Text>Video</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.chooseImage.bind(this)} >
                    <Text>Image</Text>
                </TouchableOpacity>
            </View>
        );
    }


    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                }}>

                    <GiftedChat
                        messages={this.state.messages}
                        alwaysShowSend
                        isAnimated
                        renderActions={this.renderLeftIcon}
                        showAvatarForEveryMessage
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                    />
                </View>
        );
    }
}
