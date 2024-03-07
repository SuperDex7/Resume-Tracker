import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;

public class Main {
    try{
        Parent root = FXMLLoader.load(getClass().getResource("MainScene.fxml"));
    } catch (IOException e) {
        e.printStackTrace();
    }
    
}
