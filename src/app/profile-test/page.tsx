// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";

// // Dummy data for the profile
// const user = {
//   username: "Trailblazer42",
//   displayName: "Kafka Enjoyer",
//   bio: "Day 1 Honkai: Star Rail player. Kafka main. Building a DoT team!",
//   avatarUrl: "https://example.com/avatar.jpg",
//   honkaiUid: "123456789",
//   serverRegion: "America",
//   trailblazeLevel: 65,
//   favoriteCharacters: [
//     { id: 1, name: "Kafka", rarity: 5, element: "Lightning", image: "https://example.com/kafka.jpg" },
//     { id: 2, name: "Silver Wolf", rarity: 5, element: "Quantum", image: "https://example.com/silverwolf.jpg" },
//     { id: 3, name: "Fu Xuan", rarity: 5, element: "Quantum", image: "https://example.com/fuxuan.jpg" },
//   ],
//   teams: [
//     { name: "DoT Team", characters: ["Kafka", "Sampo", "Luka", "Huohuo"] },
//     { name: "Mono Quantum", characters: ["Seele", "Silver Wolf", "Fu Xuan", "Lynx"] },
//   ],
//   stats: {
//     posts: 42,
//     likesReceived: 256,
//     badges: ["Guide Writer", "Theorycrafter"],
//   },
//   settings: {
//     theme: "dark",
//     privacy: "public",
//     notifications: true,
//   },
// };

// export default function ProfilePage() {
//   return (
//     <div className="container mx-auto py-8 px-4">
//       {/* Profile Header */}
//       <div className="flex flex-col md:flex-row gap-6 mb-8">
//         {/* Avatar & Basic Info */}
//         <div className="flex flex-col items-center md:items-start gap-4">
//           <Avatar className="w-32 h-32 border-4 border-purple-500">
//             <AvatarImage src={user.avatarUrl} alt={user.displayName} />
//             <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
//           </Avatar>
//           <div className="text-center md:text-left">
//             <h1 className="text-2xl font-bold">{user.displayName}</h1>
//             <p className="text-gray-500">@{user.username}</p>
//           </div>
//           <Button variant="outline">Edit Profile</Button>
//         </div>

//         {/* Bio & Honkai Info */}
//         <div className="flex-1 space-y-4">
//           <Card>
//             <CardContent className="pt-6">
//               <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
//               <div className="mt-4 grid grid-cols-2 gap-4">
//                 <div>
//                   <Label className="text-gray-500">Honkai UID</Label>
//                   <p>{user.honkaiUid}</p>
//                 </div>
//                 <div>
//                   <Label className="text-gray-500">Server</Label>
//                   <p>{user.serverRegion}</p>
//                 </div>
//                 <div>
//                   <Label className="text-gray-500">Trailblaze Level</Label>
//                   <p>TL {user.trailblazeLevel}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Favorite Characters */}
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Favorite Characters</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-wrap gap-4">
//             {user.favoriteCharacters.map((char) => (
//               <div key={char.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
//                 <Avatar className="w-12 h-12">
//                   <AvatarImage src={char.image} alt={char.name} />
//                   <AvatarFallback>{char.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">{char.name}</p>
//                   <Badge variant="outline">{char.element}</Badge>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Teams */}
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Teams</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {user.teams.map((team, index) => (
//               <Card key={index}>
//                 <CardHeader>
//                   <CardTitle className="text-lg">{team.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-wrap gap-2">
//                     {team.characters.map((char) => (
//                       <Badge key={char} variant="secondary">{char}</Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Community Stats */}
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Community Stats</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-3 gap-4 text-center">
//             <div>
//               <p className="text-2xl font-bold">{user.stats.posts}</p>
//               <p className="text-gray-500">Posts</p>
//             </div>
//             <div>
//               <p className="text-2xl font-bold">{user.stats.likesReceived}</p>
//               <p className="text-gray-500">Likes</p>
//             </div>
//             <div>
//               <div className="flex flex-wrap justify-center gap-2">
//                 {user.stats.badges.map((badge) => (
//                   <Badge key={badge} variant="outline">{badge}</Badge>
//                 ))}
//               </div>
//               <p className="text-gray-500 mt-2">Badges</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Settings */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Settings</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center justify-between">
//             <Label htmlFor="privacy-mode">Public Profile</Label>
//             <Switch id="privacy-mode" checked={user.settings.privacy === "public"} />
//           </div>
//           <div className="flex items-center justify-between">
//             <Label htmlFor="notifications">Enable Notifications</Label>
//             <Switch id="notifications" checked={user.settings.notifications} />
//           </div>
//           <div className="flex items-center justify-between">
//             <Label htmlFor="dark-mode">Dark Mode</Label>
//             <Switch id="dark-mode" checked={user.settings.theme === "dark"} />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
