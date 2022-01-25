
   
import List "mo:base/List";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import Time "mo:base/Time";

actor {

    public type Message = {
        text: Text;
        time: Time.Time;
    };
 
    public type Microblog = actor {
        follow: shared(Principal) -> async (); // 添加关注对象
        follows: shared query () -> async [Principal]; // 返回关注列表
        post: shared (Text) -> async (); // 发布新消息
        posts: shared query (Time.Time) -> async [Message]; // 返回所有发布的消息
        timeline: shared (Time.Time) -> async [Message]; // 返回所有关注对象发布的消息
    };
    
    stable var followed : List.List<Principal> = List.nil();

    public shared func follow(id: Principal) : async () {
        followed := List.push(id, followed);
    };

    public shared query func follows() : async [Principal] {
        List.toArray(followed)
    };
    // 发布新消息，并生成更新时间
    stable var messages : List.List<Message> = List.nil();
    public shared(msg) func post(text: Text) : async () {
        let now = Time.now();
        let timestamp = now / 1000_000_000;
        let message : Message = {text = text; time = timestamp};
        messages := List.push(message, messages);
    };
    // 返回发布的消息和更新时间
    public shared query func posts(since: Time.Time) : async [Message] {
        for (message in Iter.fromList(messages)) {
            if (since < message.time) {
            messages := List.push(message, messages);
            }
        };
        List.toArray(messages)
    };

    public shared func timeline(since: Time.Time) : async [Message] {
        var all : List.List<Message> = List.nil();
        for (id in Iter.fromList(followed)) {
            let canister : Microblog = actor(Principal.toText(id));
            let msgs = await canister.posts(since: Time.Time);
            for (msg in Iter.fromArray(msgs)) {
                if (since < msg.time) {
                    all := List.push(msg, all);
                }               
            }
        };
        List.toArray(all)
    };
}