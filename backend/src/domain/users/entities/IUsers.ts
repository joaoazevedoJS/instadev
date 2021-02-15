interface IUsers {
  id: string;

  email: string;

  user_name: string;

  name: string;

  password: string;

  user_avatar: string;

  birthday: Date;

  verified_account: boolean;

  verification_code: string;

  mail_resend_count: number;

  mail_limit_date_resend: Date;

  private_account: boolean;

  created_at: Date;

  updated_at: Date;
}

export default IUsers;
