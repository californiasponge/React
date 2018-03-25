import React from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet,
    Button,
    TextInput,
    View,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import * as services from '../Services'

export default class Register extends React.Component {

    state = {
        loading: false,
        firstName: '',
        lastName: '',
        age: null,
        weight: null,
        height: null,
        email: '',
        password: '',
        confirmedPassword: ''
    }

    validate = () => {
        let valid = (this.state.firstName && this.state.lastName && (this.state.age && this.state.age >= 13) 
                    && this.state.weight && this.state.height && this.state.email && this.state.password) 
                    && this.state.password == this.state.confirmedPassword

        if (valid) {
            this.setState({ loading: true })

            const userInfo = {
                "FirstName": this.state.firstName,
                "LastName": this.state.lastName,
                "Age": parseInt(this.state.age),
                "Weight": parseInt(this.state.weight),
                "Height": parseInt(this.state.height),
                "Email": this.state.email,
                "Password": this.state.password
            }
            return this.onRegister(userInfo);
        }

        return alert('Please complete all form field correctly to register');

        if (this.state.age && this.state.age < 13) {

            return alert('Sorry, you are too young to register right now');

        }

        if (this.state.password != this.state.confirmedPassword) {

            return alert('Passwords Do Not Match');

        }
    }

    onRegister = (userData) => {
        services.createUser(userData).then(
            response => {
                this.setState({ loading: false })
                alert('Account Creation Success')
                this.props.navigation.navigate('Home')
            },
            err => {
                alert('Unable to Complete Request')
            }
        )
    }

    Login = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
    
      if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <View style={styles.content}>
                        <ActivityIndicator size="large" color="#78d3cf" />
                    </View>
                </View>
            )
        }

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>

                <Text style={styles.title}> Register </Text>
                <View style={styles.form}>

                    <ScrollView
                        contentContainerStyle={styles.content}
                        overScrollMode='never'>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                name="firstName"
                                value={this.state.firstName}
                                onChangeText={value => this.setState({ firstName: value })}
                                selectionColor="#f27d7d"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                name="lastName"
                                value={this.state.lastName}
                                onChangeText={value => this.setState({ lastName: value })}
                                selectionColor="#f27d7d"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Age</Text>
                            <TextInput
                                style={styles.input}
                                name="Age"
                                value={this.state.age}
                                onChangeText={value => this.setState({ age: value })}
                                keyboardType="numeric"
                                maxLength={2}
                                selectionColor="#f27d7d"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Weight (in lbs)</Text>
                            <TextInput
                                style={styles.input}
                                name="Weight"
                                value={this.state.weight}
                                onChangeText={value => this.setState({ weight: value })}
                                keyboardType="numeric"
                                selectionColor="#f27d7d"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Height (in inches)</Text>
                            <TextInput
                                style={styles.input}
                                name="Height"
                                value={this.state.height}
                                onChangeText={value => this.setState({ height: value })}
                                keyboardType="numeric"
                                selectionColor="#f27d7d"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                name="Email"
                                value={this.state.email}
                                onChangeText={value => this.setState({ email: value })}
                                keyboardType="email-address"
                                selectionColor="#f27d7d"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}> Password </Text>
                            <PasswordInputText
                                name="passwordEntered"
                                value={this.state.password}
                                onChangeText={value => this.setState({ password: value })}
                                style={styles.input}
                                selectionColor="#f27d7d"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}> Confirm Password </Text>
                            <PasswordInputText
                                name="confirmedPassword"
                                value={this.state.confirmedPassword}
                                onChangeText={value => this.setState({ confirmedPassword: value })}
                                style={styles.input}
                                selectionColor="#f27d7d"
                            />
                        </View>

                        <View style={styles.buttonContainer}>

                            <TouchableHighlight style={styles.button} onPress={this.validate}>
                                <Button color="#fff" title="Register" onPress={this.validate} />
                            </TouchableHighlight>

                            <View style={styles.signUpContainer}>
                                <Text style={{ fontSize: 16, color: 'white', padding: 8 }}>
                                    Already have an account?
                            </Text>
                                <Button color="#f27d7d" onPress={this.Login} title="Login" />
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        //position: 'relative',
        backgroundColor: '#494949',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: 850,
        width: 400,
        top: 0,
        left: 0,
        right: 0,
    },
    content: {
        backgroundColor: '#494949',
        flexDirection: "column",
        alignSelf: 'center',
        marginBottom: 75,
        width: 300,
        height: 800,
    },
    label: {
        color: 'white',
        width: 250,
    },
    inputContainer: {
        flexDirection: 'column',
        margin: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "white",
        height: 30,
        color: 'white'
    },
    buttonContainer: {
        height: 30,
        width: 'auto',
        alignItems: 'center',
        top: 20,
    },
    button: {
        borderColor: '#fff',
        borderWidth: 3,
        backgroundColor: '#f27d7d',
        alignItems: 'center',
        width: 250,
        height: 50,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    words: {
        flexDirection: 'row',
        color: '#f27d7d',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        marginTop: 20,
        backgroundColor: '#494949',
        color: '#fff',
        fontSize: 24,
        top: 0,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
    },
});
