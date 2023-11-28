import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Float "mo:base/Float";

actor DBank {

  stable var currentValue : Float = 300;

  let id = 3432341342343;
  // Debug.print(debug_show (id));

  stable var startTime: Int = Time.now();

  public func topUp(amount : Float) {

    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  // topUp();

  public func withdraw(amount : Float) {

    let tempValue : Float = currentValue - amount;
    if (tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      currentValue -= 20;
      Debug.print("The widrawl amount is greater than current amount");
    };

  };

  public query func getValue() : async Float {
    return currentValue;
  };

  // Debug.print(debug_show (currentValue));
  // Debug.print(Nat.toText(currentValue));


  public func compound(input: Float){
    let currentTime = Time.now();
    let elapsedTimeNS = currentTime - startTime;
    let elapsedTimeS = elapsedTimeNS / 1000000000;
    currentValue := currentValue * ((1 + input) ** Float.fromInt(elapsedTimeS));
    Debug.print(debug_show (input));
  };


  public func reset_300(){
    currentValue := 300;
      startTime := Time.now();
  }
};
