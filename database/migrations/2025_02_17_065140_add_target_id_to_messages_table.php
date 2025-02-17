<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::whenTableDoesntHaveColumn('messages', 'target_id', function (Blueprint $table) {
            $table->foreignId("target_id")->nullable()->constrained("users");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::whenTableDoesntHaveColumn('messages', 'target_id', function (Blueprint $table) {
            $table->dropColumn('target_id');
        });
    }
};
