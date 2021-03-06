import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, AsyncStorage, } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'
import { useForm } from "react-hook-form";


const ProfilePage = ({ navigation }) => {

    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [userId, setUserId] = React.useState("")
    const [userToken, setToken] = React.useState("")

    const [age, setAge] = React.useState("")
    const [bio, setBio] = React.useState("")
    const [city, setCity] = React.useState("")
    const [country, setCountry] = React.useState("")
    const [gender, setGender] = React.useState("M")
    const [photo, setPhoto] = React.useState("")
    const [points, setPoints] = React.useState("")
    const [profileId, setProfileId] = React.useState("")


    useEffect(() => {

        AsyncStorage.multiGet(['profileId', 'userId', 'token', 'email', 'first_name', 'last_name', 'age', 'bio', 'city', 'country', 'gender', 'photo', 'points', 'profileId'], (err, stores) => {
            stores.map((result, i, store) => {
                if (store[0][1] !== "") {
                    switch (store[i][0]) {

                        case 'age':
                            setAge(store[i][1])
                        case 'bio':
                            setBio(store[i][1])
                        case 'city':
                            setCity(store[i][1])
                        case 'country':
                            setCountry(store[i][1])
                        case 'gender':
                            setGender(store[i][1])
                        case 'photo':
                            setPhoto(store[i][1])
                        case 'points':
                            setPoints(store[i][1])
                        case 'profileId':
                            setProfileId(store[i][1])
                    }
                }
                switch (store[i][0]) {
                    case 'userId':
                        setUserId(store[i][1])
                    case 'token':
                        setToken(store[i][1])
                    case 'email':
                        setEmail(store[i][1])
                    case 'first_name':
                        setFirstName(store[i][1])
                    case 'last_name':
                        setLastName(store[i][1])
                    
                }
            })
        })
    }, [])

    const createNewProfile = (data) => {
        axios.post('https://covid-see10.herokuapp.com/api/authuserprofiles/', { user: parseInt(userId), first_name: data.first_name ? data.first_name : firstName,  email: data.email ? data.email : email, last_name: data.last_name ? data.last_name : lastName, city: data.city, country: data.country, bio: data.bio, age: parseInt(data.age), gender: data.gender}, {headers: {'Authorization': `Token ${userToken}`}})
    }

    const updateProfile = (data) => {
        axios.post('https://covid-see10.herokuapp.com/api/authuserprofiles/', { user: parseInt(userId), first_name: data.first_name ? data.first_name : firstName,  email: data.email ? data.email : email, last_name: data.last_name ? data.last_name : lastName, city: data.city ? data.city : city, country: data.country ? data.country : country, bio: data.bio ? data.bio : bio, age: parseInt(data.age) ? parseInt(data.age) : parseInt(age), gender: data.gender ? data.gender : gender}, {headers: {'Authorization': `Token ${userToken}`}})

    }
    const { register, handleSubmit, setValue } = useForm()



    useEffect(() => {
        register('first_name')
        register('last_name')
        register('email')
        register('city')
        register('country')
        register('age')
        register('gender')
        register('bio')
    }, [register])

    
    return (
        <ImageBackground
            style={styles.background}
            source={require("../mainBackground.png")}
        >
            {
                firstName && lastName && email
                    ?


                    <View style={styles.container} >
                        <View style={styles.headerDiv}>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.toggleDrawer()}>
                                <Image style={styles.covidIcon}
                                    source={require('../covidIcon.png')}
                                    resizeMode="cover"
                                >
                                </Image>
                            </TouchableOpacity >
                            <View style={styles.headerText}>
                                <Text style={styles.headerTextStyle2}>Welcome!</Text>
                            </View>
                            <Image
                                style={styles.profileImage}
                                source={require('../profileIcon.png')}
                                resizeMode="contain"
                            >
                            </Image>
                        </View>
                        <View style={styles.bottomDiv}>
                            <View style={styles.rightBottomDiv}>
                                <Text style={styles.text}>First Name</Text>
                                <TextInput editable style={styles.inputs} placeholder={firstName} onChangeText={text => {
                                    setValue('first_name', text)
                                }}>
                                    {firstName}
                                </TextInput>
                                <Text style={styles.text}>Last Name</Text>
                                <TextInput editable style={styles.inputs} placeholder={lastName} onChangeText={text => {
                                    setValue('last_name', text)
                                }}>{lastName}</TextInput>
                                <Text style={styles.text}>Email</Text>
                                <TextInput editable style={styles.inputs} placeholder={email} onChangeText={text => {
                                    setValue('email', text)
                                }}> {email}</TextInput>
                                <Text style={styles.text}>Town/City</Text>
                                <TextInput editable style={styles.inputs}
                                    placeholder="Colorado Springs" onChangeText={text => {
                                        setValue('city', text)
                                    }}>{city ? city : ""}</TextInput>
                                <Text style={styles.text}>Country</Text>
                                <TextInput editable style={styles.inputs} placeholder="United States" onChangeText={text => {
                                    setValue('country', text)
                                }}>{country ? country : ""}</TextInput>
                                <Text style={styles.text}>Age</Text>
                                <TextInput editable style={styles.inputs} placeholder="25" onChangeText={text => {
                                    setValue('age', text)
                                }}>{age ? age : ""}</TextInput>
                                <Text style={styles.text}>Gender</Text>
                                <TextInput editable style={styles.inputs} placeholder="M/F" onChangeText={text => {
                                    setValue('gender', text)
                                }}>{gender ? "F/M" : gender}</TextInput>
                                <Text style={styles.text}>Bio</Text>
                                <TextInput editable style={styles.bio} placeholder="Write something about yourself!" onChangeText={text => {
                                    setValue('bio', text)
                                }}>{bio ? bio : ""}</TextInput>
                                {
                                    profileId == null
                                        ? <TouchableOpacity style={styles.updateButton}>
                                        <Text style={styles.inputs2} onPress={handleSubmit(createNewProfile)}>Create</Text>
                                            </TouchableOpacity>
                                        : <TouchableOpacity style={styles.updateButton}>
                                            <Text style={styles.inputs2} onPress={handleSubmit(updateProfile)}>Update</Text>
                                        </TouchableOpacity>
                                        
                                }

                            </View>
                        </View>
                    </View>
                    : null
            }
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 4,
        borderColor: "black",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    headerDiv: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        maxHeight: "15%",
        backgroundColor: "white",
        justifyContent: "space-between",
        padding: "1%",
        marginTop: "5%"
    },
    bottomDiv: {
        width: "100%",
        height: "90%",
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        marginTop: '-5%'
    },
    headerText: {
        width: "65%",
        justifyContent: "center",
        alignItems: "center"
    },
    covidIcon: {
        maxHeight: "100%",
        width: "100%",
    },
    backButton: {
        minWidth: "20%",
        height: "100%",
    },
    headerTextStyle2: {
        fontSize: 20,
        fontWeight: "bold"
    },
    profileImage: {
        width: "15%",
        height: "99%"
    },
    background: {
        width: '100%',
        height: '110%',

    },
    hamburger: {
        minWidth: "10%",
        height: "8%",
        marginLeft: "4%",
    },
    rightBottomDiv: {
        width: "85%",
        height: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "-2%"
        // paddingLeft: "5%"
    },
    inputs: {
        width: "80%",
        height: "5%",
        borderBottomWidth: 1,
        marginBottom: "1%",
        textAlign: "center",
        fontSize: 18,
    },
    inputs2: {
        // width: "90%",
        // height: "5%",
        marginBottom: "1%",
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },

    bio: {
        width: "80%",
        height: "8%",
        borderWidth: 1,
        textAlign: "center",
        fontSize: 15
    },
    text: {
        fontSize: 15,
        padding: "0.5%",
        color: "black",
    },
    updateButton: {
        marginTop: "1%",
        minWidth: "60%",
        height: "30%",
        borderWidth: 1,
        // paddingTop: "1.5%",
        justifyContent: "center",
        backgroundColor: "black",
        opacity: 0.8,

    }
});


export default ProfilePage
