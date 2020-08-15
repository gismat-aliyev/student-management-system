package az.com.studentmanagementsystem.util;

public class Validation {

    public static String checkNameOrSurname(String name) {
        String h;
        name = name.toLowerCase();
        h = name.charAt(0) + "";
        return h.toUpperCase() + name.substring(1);

    }
}
