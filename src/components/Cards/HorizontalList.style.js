export const _iconContainer = (primaryColor) => ({
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#18191E",
    shadowRadius: 8,
    shadowOpacity: 0.35,
    shadowColor: primaryColor,
    shadowOffset: {
        width: 0,
        height: 3,
    },
});

export const _unitTextStyle = (primaryColor) => ({
    fontWeight: "700",
    color: primaryColor,
});

export default {
    container: {
        backgroundColor: "#18191E",
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainerStyle: {
        paddingBottom: 24,
        alignItems: "center",
    },
    contentInsetStyle: {
        right: 24,
    },
    itemContainer: {
        width: 160,
        height: 160,
        paddingTop: 12,
        marginLeft: 12,
        marginTop: 2,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 12,
        paddingBottom: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#282A37",
        shadowRadius: 8,
        shadowOpacity: 0.1,
        shadowColor: "#757575",
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    imageContainer: {
        marginTop: 14,
    },

    textContainer: {
        marginBottom: 12,
        marginTop: "auto",
        alignItems: "center",
        justifyContent: "center",
    },
    titleTextStyle: {
        color: "#fff",
        fontWeight: "600",
    },
    valueTextStyle: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    unitTextContainer: {
        marginTop: 8,
    },
};