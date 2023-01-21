export default  {
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    label: {
        width: 80,
        paddingRight: 10,
    },
    input: {
        flexGrow: 1,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "grey",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    buttonContainer: {
        marginTop: 0,
        display: "flex",
        justifyContent: "center"
    },
    button: {
        marginTop: 20,
        backgroundColor: "grey",
        paddingHorizontal: 10,
        paddingVertical: 10,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    footerText: {
        marginTop: 20,
        textAlign: "center",
    },
    error: {
        color: "red"
    }
}
