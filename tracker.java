import java.util.*;
public class tracker {
    String companyy;
    String positionn;
    public tracker(String compName, String jobTitle){
companyy = compName;
positionn = jobTitle;

    }
    public static void main(String[] args){
Scanner scan = new Scanner(System.in);

System.out.println("Enter Company Name.");
String company = scan.nextLine();
System.out.println("Enter Job Position.");
String position = scan.nextLine();
tracker resume1 = new tracker(company, position);
System.out.println("Company Name: "+resume1.companyy);
System.out.println("Job Title: "+resume1.positionn);
    }
}
