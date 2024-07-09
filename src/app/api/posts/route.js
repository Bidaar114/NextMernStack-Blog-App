//import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {

  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 2;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),

    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  
  
  try {

const [posts, count] = await prisma.$transaction([
  prisma.post.findMany(query),
  prisma.post.count({ where: query.where }),
]);

    // const posts  = await prisma.post.findMany({
    //   take: POST_PER_PAGE,
    //   skip: POST_PER_PAGE * (page - 1),

    // })
      
    //const count = await prisma.post.count({ where: query.where })
    
   
    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};



// const [posts, count] = await prisma.$transaction([
//   prisma.post.findMany(query),
//   prisma.post.count({ where: query.where }),
// ]);

const [posts, totalPosts] = await prisma.$transaction([
  prisma.post.findMany({ where: { title: { contains: 'prisma' } } }),
  prisma.post.count(),
])








   // CREATE A POST

  export const POST = async (req) => {

  // const session = await getAuthSession();

  // if (!session) {
  //   return new NextResponse(
  //     JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
  //   );
  // }
 
    //const { categoryData, postData } = req.body;

      const body = await req.json();

    try {

      // Create Category
      const category = await prisma.category.create({
        data: {
          slug: body.catSlug,
          title: body.title,
          img: body.img,
        },
      });

      // Create Post with a reference to the Category
      const post = await prisma.post.create({
        data: {
          slug: body.slug,
          title: body.title,
          desc: body.desc,
          img: body.img,
          catSlug: body.catSlug,
        },
      });

//   try {

//     const body = await req.json();

//     const post = await prisma.category.create({

//  data:{ 
//   slug : body.slug,
//   title: body.title,
//   img :  body.img,
             
//     Posts:{              
//            create: body,
              
          
           
//         },
//       },
//     });


    return new NextResponse(JSON.stringify( post, category,  { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
