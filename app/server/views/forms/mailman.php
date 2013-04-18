<?php
class mailman 
{
public $tablename;
public $address; 
public $hide; 
public $nomail;
public $ack;
public $not_metoo; 
public $digest;
public $plain;
public $password;
public $lang;
public $name;
public $one_last_digest;
public $user_options;
public $delivery_status;
public $topics_userinterest;
public $delivery_status_timestamp;
public $bi_cookie;
public $bi_score;
public $bi_noticesleft;
public $bi_lastnotice;
public $bi_date;

	public function checkvalid()
	{
		 if( $this->tablename != '' && $this->address != '') {
			$query = "SELECT * from ".$this->tablename." where address ='".$this->address."'";
			mysql_query($query);
		 }else{
			return false;
		 }
	} 

	public function getvaluesfromaddress()
	{
		if( $this->tablename != '' && $this->address != '') {
			$query = "SELECT * from ".$this->tablename." where address ='".$this->address."'";
			$res = mysql_query($query);
            if(!mysql_errno()) {
				$i = 0;
           		while ($record = mysql_fetch_assoc ($res)){
              		$prop[$i] = $record;
               		$i++;
           		}
           		return $prop;
			}
		}
	}

	public function generaterandcode()
	{
		$this->delivery_status = rand(673,62389);
		$query = "UPDATE ".$this->tablename." set delivery_status = ".$this->delivery_status." where address ='".$this->address."'"; 
		$res = mysql_query($query);
        if(!mysql_errno()) {
			return $this->delivery_status;
		}else{
			return false;
		}
	}	


	public function checkcode()
	{
		$query = "SELECT * from ".$this->tablename." where delivery_status = ".$this->delivery_status." and address = '".$this->address."'";
		$res = mysql_query($query);
		$a = array();
		while($r = mysql_fetch_object($res)) {
			$a[] = $r;
		}
        if($a) {
			return true; 
        } else {
            return false;
        }
	}

	public function unsubscribe()
	{
		//$query = "UPDATE ".$this->tablename." set ack = 'N' where delivery_status = ".$this->delivery_status." and address = '".$this->address."'";
		$query = "DELETE FROM ".$this->tablename." where delivery_status = ".$this->delivery_status." and address = '".$this->address."'";
		$res = mysql_query($query);
        if(!mysql_errno()) {
			return true;
		}else{
			return false;
		}
	}
}

?>
