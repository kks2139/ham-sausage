// app/api/user/route.ts
import { NextResponse } from "next/server";

import { createClient } from "@/app/utils/supabase";

const getInternalError = (msg: string) =>
  NextResponse.json({ errorMessage: msg }, { status: 500 });

const getBadRequestError = () =>
  NextResponse.json({ errorMessage: "잘못된 요청입니다." }, { status: 400 });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return getBadRequestError();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      return getInternalError(error.message);
    }

    return NextResponse.json(data);
  } catch (e) {
    console.log("GET Error!!", e);

    return getInternalError("일시적인 오류가 발생했습니다.");
  }
}

// [POST] 유저 생성 또는 [PUT] 유저 수정: Body 데이터 사용
// export async function PUT(request: Request) {
//   const { id, nickname } = await request.json(); // Body에서 데이터 추출

//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from("users")
//     .update({ nickname })
//     .eq("id", id)
//     .select();

//   if (error) {
//     return getInternalError(error.message);
//   }

//   return NextResponse.json(data);
// }
