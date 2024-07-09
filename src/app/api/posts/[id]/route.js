import prisma from "@/utils/connect";
import { NextResponse } from "next/server";



// GET SINGLE POST
export const GET = async ( req, {params}) => {


  //const {slug } = params;
  

  try {

    const post = await prisma.post.findUnique({

      where:{ id: params.id},
           
    });
    




    if (!post) {
     return new NextResponse(JSON.stringify({ error: 'Post not found' }));
      
    }

    const views = await prisma.post.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
      // include: { user: true },
      
    });

  
  
    


    
    return new NextResponse(JSON.stringify(post, views,  { status: 200 }));

  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


// const ve = await prisma.post.update({
    //   where: { slug },
    //   data: { views: { increment: 1 } },
    //   // include: { user: true },
      
    // });