import { StyleSheet } from "react-native";

const LoginSignupStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  gradientBackground: {
    width: "100%",
    height: 180,
    backgroundColor: "#9261F3",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4B0082",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#555",
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#4B0082",
    borderColor: "#4B0082",
  },
  checkboxText: {
    fontSize: 14,
    color: "#555",
  },
  boldText: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4B0082",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  socialText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});

export default LoginSignupStyles;
